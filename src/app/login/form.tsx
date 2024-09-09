"use client";
import { Form } from "@/components/forms";
import { createClient } from "@/lib/supabase/client";
import { FormLayout, SubmitButton } from "@saas-ui/forms";
import { z } from "zod";
import { toast } from "sonner";

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);


export default function LoginForm() {
  const supabase = createClient();

  return (
    <Form
      onSubmit={async (values) => {
        const { error } = await supabase.auth.signInWithPassword(values);

        if (error) {
          toast.error(error.message);
          // handle error
        }

        // const { } = await supabase.auth.signInWithPassword(values);

        // if (error) {
        //   toast.error(error.message);
        //   // handle error
        // }

      }}
      defaultValues={{ email: "", password: "" }}
      schema={z.object({
        email: z.string().email(),
        password: z.string().min(8).max(100).regex(passwordValidation, "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"),
      })}
      className="max-w-lg w-full"
    >
      {({ Field }) => (
        <FormLayout className="w-full">
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
          <SubmitButton size="lg">Sign In</SubmitButton>
        </FormLayout>
      )}
    </Form>
  );
};