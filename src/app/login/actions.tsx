'use server';

import { lucia } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { z } from "zod";
import { db } from "@/server/db";

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const loginInput = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100).regex(passwordValidation, "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"),
});

export async function login(input: {
  email: string;
  password: string;
}) {
  const { email, password } = loginInput.parse(input);

  const user = await db.user.findFirst({
    where: {
      email: email
    }
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  if (!user.hashedPassword) {
    throw new Error("Invalid email or password");
  }

  const validPassword = await bcrypt.compare(password, user.hashedPassword);

  if (!validPassword) {
    throw new Error("Invalid email or password");
  }

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return {
    user
  };

}