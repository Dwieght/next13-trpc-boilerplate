// import prisma from "~/config/Prisma";
// import z from "zod";

import prisma from "~/config/Prisma";
import { router, publicProcedure } from "../trpc";

export const youtubeLink = router({
    getAllLinks: publicProcedure.query(async () => {
        const youtubeLink = await prisma.youtubeLink.findMany();
        console.log("i am yt link", youtubeLink);
        return youtubeLink;
    }),
});
