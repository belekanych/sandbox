import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { expensesRouter } from "./expenses";

export const appRouter = router({
  expenses: expensesRouter,
  userList: publicProcedure.query(() => {
    // Retrieve users from a datasource, this is an imaginary database
    const users: string[] = ["Hello World"];
    return users;
  }),
  userById: publicProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;
    // Retrieve the user with the given ID
    const user = `Id: ${input}`;
    return user;
  }),
  userCreate: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts;
      // Create a new user in the database
      const user = "${input}";
      return user;
    }),
});
