"use client";

import { Form } from "@/components/forms";
import { SubmitButton, FormLayout } from "@saas-ui/forms";
import { z } from "zod";
import { toast } from "sonner";
import { contactFormResponse } from "./actions";

export function ContactUs() {
  return (
    <div id="contact-us" className="max-w-6xl py-10 px-4 sm:px-6 lg:px-8 lg:py-16 mx-auto">
      <div className="max-w-xl text-center mx-auto">
        <div className="mb-5">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
            Contact Us
          </h2>
          <p className="mt-4 text-center text-lg w-full">
            We are here to help you with any questions you may have. Fill out the form below and we will get back to you as soon as possible.
          </p>
        </div>
        <div className="mt-5 w-full border lg:mt-8 flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
          <Form
            defaultValues={{ phone: "", name: "", email: "", message: "" }}
            onSubmit={async (values) => {
              await contactFormResponse(values);
              toast.success("Thank you we will get back to you soon!");
            }}
            className="w-full "
            schema={z.object({
              name: z.string().min(2).max(50),
              email: z.string().email(),
              phone: z.string().min(10).max(15),
              message: z.string().min(3).max(500),
            })}
          >
            {({ Field }) => (
              <FormLayout colorScheme="blue" className="flex  flex-col md:min-w-44 gap-4 w-full">
                <Field
                  name="name"
                  placeholder="Enter your name"
                  type="text"
                  rules={{ required: true }}
                />
                <Field
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                />
                <Field
                  name="phone"
                  placeholder="Enter your phone number"
                  type="text"
                />
                <Field
                  name="message"
                  placeholder="Enter your message"
                  type="textarea"
                  rules={{ required: true }}
                />
                <SubmitButton colorScheme="blue">Submit</SubmitButton>
              </FormLayout>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
}