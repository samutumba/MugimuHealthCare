"use server";
import { resend } from "@/lib/resend";
import { z } from "zod";


const contactFormSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  message: z.string().min(3).max(500),
});

export const contactFormResponse = async (data: {
  name: string,
  email: string,
  phone: string,
  message: string,
}) => {

  const {
    name,
    email,
    phone,
    message,
  } = contactFormSchema.parse(data);

  // Send email to support
  await resend.emails.send({
    from: 'Resend <onboarding@resend.dev>',
    to: ["mugimuhealthcare@gmail.com"],
    subject: "New Contact Form Submission",
    html: `
      <h1>New Contact Form Submission</h1>
      <ul>
        <li>Name: ${name}</li>
        <li>Email: ${email}</li>
        <li>Phone: ${phone}</li>
      </ul>
      <p>${message}</p>
    `,
  });


};

export const addSubscriber = async (email: string) => {
  // Add subscriber to mailchimp

  await resend.contacts.create({
    email,
    audienceId: process.env.RESEND_AUDIENCE_ID ?? "",
  });

  return true;

};