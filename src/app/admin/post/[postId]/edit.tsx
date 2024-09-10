"use client";

import { Form } from "@/components/forms";
import { Post } from "@prisma/client";
import { z } from "zod";
import {
  PropertyList,
  Property,
  PropertyLabel,
  PropertyValue,

} from '@saas-ui/react';
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { SubmitButton, FormLayout } from "@saas-ui/forms";

const TOAST_ID = 'edit-post';

export const EditPost = ({ post }: { post: Post; }) => {
  const editPost = api.post.edit.useMutation({
    onSuccess: () => {
      toast.success("Post updated successfully", { id: TOAST_ID });
    },
    onError: (error) => {
      toast.error(error.message, { id: TOAST_ID });
    }
  });
  return (
    <Form
      onSubmit={async (values) => {
        toast.loading("Updating post...", { id: TOAST_ID });
        // Update post
        await editPost.mutateAsync({ ...values });
      }}
      defaultValues={{
        id: post.id,
        name: post.name,
        content: post.content,
        tags: post.tags || []
      }}
      schema={z.object({
        id: z.string(),
        name: z.string().min(6, "Title too short").max(100),
        content: z.string().min(6, "Content too short").max(100000),
        tags: z.array(z.string())
      })}
    >
      {({ Field }) => (
        <FormLayout>
          <Field name="name" label="Title" type="text" placeholder="" />
          <Field name="content" label="Content" type="editor" placeholder="Enter content" />
          <Field name="tags" type="select"
            label="Tags"
            multiple placeholder="Enter your tags"
            options={[
              'nutrition',
              'exercise',
              'sleep',
              'stress',
              'community',
              'communication',
              'education',
              'environment',
              'finances',
              'medication',

            ].map((tag) => ({ label: tag, value: tag }))} />
          <SubmitButton className="w-full" colorScheme="blue">Submit</SubmitButton>
        </FormLayout>)}
    </Form>
  );

};