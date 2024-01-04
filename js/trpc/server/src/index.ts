import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import Expense from "./models/expense";
import { appRouter } from "./routers";

dotenv.config();

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
