'use client';

import { Form } from "@/components/forms";
import { SubmitButton, FormLayout } from "@saas-ui/forms";
import { z } from "zod";
import { toast } from "sonner";

export const SubscriptionToNewsletter = () => {
  return (<>
    <div id="subscription" className="max-w-6xl w-full py-10 px-4 sm:px-6 lg:px-8 lg:py-16 mx-auto">
      <div className="max-w-xl text-center mx-auto">
        <div className="mb-5">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
            Sign up to our newsletter
          </h2>
          <p className="mt-4 text-center text-lg w-full">
            Subscribe to our newsletter to get the latest updates on newer food recipies and parental tips.
          </p>
        </div>
        <div className="mt-5 w-full lg:mt-8 flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
          <Form
            defaultValues={{ email: "" }}
            onSubmit={async (values) => {
              console.log(values);
              toast.success("Thank you for subscribing!");
            }}
            className="w-full md:min-w-44"
            schema={z.object({
              email: z.string().email(),
            })}
          >
            {({ Field }) => (
              <FormLayout colorScheme="blue" className="flex flex-row gap-1 w-full">
                <Field
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                  rules={{ required: true }}
                />
                <SubmitButton colorScheme="blue">Subscribe</SubmitButton>
              </FormLayout>
            )}
          </Form>
        </div>
      </div>
    </div>
  </>
  );
};