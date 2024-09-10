"use client";

import { Button, useDisclosure } from '@chakra-ui/react';
import { FormDialog } from "@/components/forms";
import { SubmitButton, FormLayout } from "@saas-ui/forms";
import { z } from "zod";
import { toast } from "sonner";
import { PlusIcon } from '@saas-ui/react';
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export const CreatePost = () => {
  const disclosure = useDisclosure();
  const router = useRouter();

  const newPost = api.post.create.useMutation({
    onSuccess: (data) => {
      toast.success("Post created successfully");
      router.push(`/admin/post/${data.id}`);
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
        title="New post"
        {...disclosure}
        defaultValues={{ name: "" }}
        onSubmit={async (values) => {
          await newPost.mutateAsync(values);
        }}
        className="w-full md:min-w-44"
        schema={z.object({
          name: z.string().min(6, "Title too short").max(100),
        })}
        colorScheme="blue"
      >
        {({ Field }) => (
          <FormLayout colorScheme="blue" className="flex flex-col md:min-w-44 gap-4 w-full">
            <Field
              name="name"
              placeholder="Enter the title of the post"
              type="textarea"
              rules={{ required: true }}
            />
          </FormLayout>
        )}
      </FormDialog>
    </>
  );
};