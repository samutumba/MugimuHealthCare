import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          name: input.name,
          content: "",
          slug: input.name.toLowerCase().replace(/\s/g, "-"),
          createdBy: { connect: { id: ctx.user.id } },
        },
      });
    }),

  edit: protectedProcedure
    .input(z.object({
      id: z.string(),
      name: z.string().min(1),
      tags: z.array(z.string()),
      content: z.string().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.update({
        where: { id: input.id },
        data: { name: input.name, content: input.content, tags: { set: input.tags } },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.delete({
        where: { id: input.id },
      });
    }),

  getPosts: publicProcedure.input(z.object({ limit: z.number() })).query(
    async ({ input, ctx }) => {
      return ctx.db.post.findMany({
        take: input.limit,
        orderBy: { createdAt: "desc" },
      });
    }
  ),

  getPostById: publicProcedure.input(z.object({ id: z.string() })).query(
    async ({ input, ctx }) => {
      return ctx.db.post.findUnique({
        where: { id: input.id },
      });
    }
  ),

  getPostBySlug: publicProcedure.input(z.object({ slug: z.string() })).query(
    async ({ input, ctx }) => {
      return ctx.db.post.findUnique({
        where: { slug: input.slug },
      });
    }
  ),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return post ?? null;
  }),
});
