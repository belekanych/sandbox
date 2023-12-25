import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

dotenv.config();
const appRouter = router({
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

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  console.log("[request]: /");
  res.send("Express + TypeScript Server");
});

app.use(
  "/api",
  createExpressMiddleware({
    router: appRouter,
  })
);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
