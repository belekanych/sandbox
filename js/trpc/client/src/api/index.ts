import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../../server/src";

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
export default createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "/api",
    }),
  ],
});
