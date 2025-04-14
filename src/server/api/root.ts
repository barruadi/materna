import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { pasienRouter } from "./routers/pasien";
import { taskRouter } from "./routers/task";
import { historyRouter } from "./routers/history";
import { nakesRouter } from "./routers/nakes";
import { riwayatRouter } from "./routers/riwayat";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  task: taskRouter,
  pasien: pasienRouter,
  history: historyRouter,
  nakes: nakesRouter,
  riwayat: riwayatRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
