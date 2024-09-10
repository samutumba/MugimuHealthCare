"use client";

import { Button, useDisclosure } from '@chakra-ui/react';
import { FormDialog } from "@/components/forms";
import { SubmitButton, FormLayout } from "@saas-ui/forms";
import { z } from "zod";
import { toast } from "sonner";
import { PlusIcon } from '@saas-ui/react';
import { api } from "@/trpc/react";
import { redirect } from "next/navigation";

export const CreateEvent = () => {
  const disclosure = useDisclosure();

  const newEvent = api.event.create.useMutation({
    onSuccess: (data) => {
      toast.success("Event created successfully");
      redirect(`/admin/event/${data.id}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <>
      <Button colorScheme="orange" onClick={() => disclosure.onOpen()} className="" size="md">
        Create New
      </Button>
      <FormDialog
        title="New Event"
        {...disclosure}
        defaultValues={{ name: "", description: "", startdate: "", location: "" }}
        onSubmit={async (values) => {
          await newEvent.mutateAsync({
            ...values,
            startdate: new Date()
          });
        }}
        className="w-full md:min-w-44"
        schema={z.object({
          name: z.string().min(6, "Title too short").max(50),
          description: z.string(),
          startdate: z.string(),
          location: z.string()
        })}
        colorScheme="blue"
      >
        {({ Field }) => (
          <FormLayout colorScheme="blue" className="flex flex-col md:min-w-44 gap-4 w-full">
            <Field
              name="name"
              placeholder="Enter the title of the event"
              type="text"
              rules={{ required: true }}
            />
            <Field
              name="description"
              placeholder="Enter the description of the event"
              type="textarea"
              rules={{ required: true }}
            />
            <Field
              name="startdate"
              placeholder="Enter the start date of the event"
              type="text"
              rules={{ required: true }}
            />
            <Field
              name="location"
              placeholder="Enter the location of the event"
              type="textarea"
              rules={{ required: true }}
            />
          </FormLayout>
        )}
      </FormDialog>
    </>
  );
};