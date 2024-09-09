import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const eventRouter = createTRPCRouter({

  edit: protectedProcedure
    .input(z.object({
      id: z.string().cuid().optional(),
      name: z.string(),
      description: z.string(),
      startdate: z.date(),
      location: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.event.update({
        where: { id },
        data: { ...data },
      });
    }),

  create: protectedProcedure
    .input(z.object({
      name: z.string(),
      description: z.string(),
      startdate: z.date(),
      location: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const event = await ctx.db.event.create({
        data: {
          name: input.name,
          description: input.description,
          startdate: input.startdate,
          location: input.location
        }
      });

      return event;
    }),


  delete: protectedProcedure
    .input(z.object({
      id: z.string().cuid()
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.event.delete({
        where: { id: input.id },
      });
    }),

  getEvents: publicProcedure.input(z.object({ limit: z.number() })).query(
    async ({ input, ctx }) => {
      return ctx.db.event.findMany({
        take: input.limit,
        orderBy: { createdAt: "desc" },
      });
    }
  ),

  getEventById: publicProcedure.input(z.object({ id: z.string() })).query(
    async ({ input, ctx }) => {
      return ctx.db.event.findFirst({
        where: { id: input.id },
      });
    }
  ),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const event = await ctx.db.event.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return event ?? null;
  }),
});
