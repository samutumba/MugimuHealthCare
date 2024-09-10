"use client";
import { Form } from "@/components/forms";
import { createClient } from "@/lib/supabase/client";
import { FormLayout, SubmitButton } from "@saas-ui/forms";
import { z } from "zod";
import { toast } from "sonner";
import { api } from "@/trpc/react";

import { useRouter } from 'next/navigation';

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);


export default function RegisterForm() {
  const router = useRouter();

  const login = api.auth.register.useMutation({
    onSuccess: () => {
      toast.success("Logged in successfully");
      router.push("/admin");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <Form
      onSubmit={async (values) => {
        await login.mutateAsync(values);
      }}
      defaultValues={{ email: "", password: "", name: "" }}
      schema={z.object({
        name: z.string().min(2).max(100),
        email: z.string().email(),
        password: z.string().min(8).max(100).regex(passwordValidation, "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"),
      })}
      className="max-w-lg w-full"
    >
      {({ Field }) => (
        <FormLayout className="w-full">
          <Field
            name="name"
            label="Name"
            type="text"
            rules={{ required: true }}
          />
          <Field
            name="email"
            label="Email"
            type="email"
            rules={{ required: true }}
          />
          <Field
            name="password"
            label="Password"
            type="password"
            rules={{ required: true }}
          />
          <SubmitButton size="lg">Register</SubmitButton>
        </FormLayout>
      )}
    </Form>
  );
};