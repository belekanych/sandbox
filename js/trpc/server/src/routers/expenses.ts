import { z } from "zod";
import Expense from "../models/expense";
import { publicProcedure, router } from "../trpc";

const expenses: Expense[] = [];

export const expensesRouter = router({
  index: publicProcedure.query(() => {
    return expenses;
  }),
  store: publicProcedure
    .input(z.object({ name: z.string(), price: z.number() }))
    .mutation(async (opts) => {
      const { input } = opts;
      // Create a new user in the database
      const expense = Expense.create(input.name, input.price);

      expenses.push(expense);

      return expense;
    }),
  remove: publicProcedure.input(z.string()).mutation(async (opts) => {
    const { input } = opts;

    const index = expenses.findIndex((expense) => expense.id === input);

    if (index === -1) {
      return false;
    }

    expenses.splice(index);

    return true;
  }),
});
