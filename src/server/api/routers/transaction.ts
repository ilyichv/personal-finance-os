import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { transactionInsertSchema, transactions } from "~/server/db/schema";

export const transactionRouter = createTRPCRouter({
  create: publicProcedure
    .input(transactionInsertSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(transactions).values({
        name: input.name,
        type: input.type,
        amount: input.amount,
        categoryId: input.categoryId,
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
});
