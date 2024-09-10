import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { lucia } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";


const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

export const authRouter = createTRPCRouter({

  login: publicProcedure.input(z.object({
    email: z.string().email(),
    password: z.string().min(8).max(100).regex(passwordValidation, "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"),
  })).mutation(
    async ({ input, ctx }) => {
      const user = await ctx.db.user.findFirst({
        where: {
          email: input.email
        }
      });

      if (!user) {
        throw new Error("Invalid email or password");
      }

      if (!user.hashedPassword) {
        throw new Error("Invalid email or password");
      }

      const validPassword = await bcrypt.compare(input.password, user.hashedPassword);

      if (!validPassword) {
        throw new Error("Invalid email or password");
      }

      const session = await lucia.createSession(user.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      //cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

      ctx.headers.set('Set-Cookie', sessionCookie.serialize());

      return {
        user
      };

    }
  ),

  register: publicProcedure.input(z.object({
    email: z.string().email(),
    password: z.string().min(8).max(100).regex(passwordValidation, "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"),
    name: z.string().min(2).max(100),
  })).mutation(
    async ({ input, ctx }) => {
      const existingUser = await ctx.db.user.findFirst({
        where: {
          email: input.email
        }
      });

      if (existingUser) {
        throw new Error("Email already in use");
      }

      const hashedPassword = await bcrypt.hash(input.password, 10);

      const user = await ctx.db.user.create({
        data: {
          email: input.email,
          hashedPassword,
          name: input.name,
        }
      });

      const session = await lucia.createSession(user.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);

      ctx.headers.set('Set-Cookie', sessionCookie.serialize());

      return {
        user
      };
    }
  ),



  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const event = await ctx.db.event.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return event ?? null;
  }),
});
