import { z } from "zod";
import { sql, eq, between, and } from "drizzle-orm";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  categories,
  transactionInsertSchema,
  transactions,
} from "~/server/db/schema";
import { getPeriod } from "~/lib/chat/utils";

export const transactionRouter = createTRPCRouter({
  create: publicProcedure
    .input(transactionInsertSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(transactions).values({
        name: input.name,
        type: input.type,
        amount: input.amount,
        categoryId: input.categoryId,
        userId: input.userId,
        date: input.date,
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.transactions.findMany({
      with: {
        category: true,
      },
    });
  }),
  getGroupedByCategory: publicProcedure
    .input(
      z.object({
        period: z.string(),
      }),
    )
    .query(async ({ ctx, input: { period } }) => {
      const { start, end } = getPeriod(period);

      return ctx.db
        .select({
          id: transactions.categoryId,
          name: categories.name,
          total: sql`sum(${transactions.amount})`.mapWith(Number),
        })
        .from(transactions)
        .leftJoin(categories, eq(transactions.categoryId, categories.id))
        .where(
          and(
            eq(transactions.type, "outcome"),
            between(transactions.date, start, end),
          ),
        )
        .groupBy(transactions.categoryId, categories.name);
    }),
});
