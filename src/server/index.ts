import { youtubeLink } from "./routers/youtubeLinkRouter";
import { mergeRouters } from "./trpc";

export const appRouter = mergeRouters(youtubeLink);

export type AppRouter = typeof appRouter;
