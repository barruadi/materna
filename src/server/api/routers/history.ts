import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
} from "~/server/api/trpc";

export const historyRouter = createTRPCRouter({
    getHistoryByPatient: publicProcedure
        .input(z.object({ pasienId: z.string() }))
        .query(async ({ input, ctx }) => {
            const history = await ctx.db.riwayat.findMany({
                where: { pasienId: input.pasienId },
                orderBy: { createdAt: 'desc' },
            });
        return history;
    }),
    getHistoryDetailById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input, ctx }) => {
            const history = await ctx.db.riwayat.findUnique({
                where: { id: input.id },
            });
        return history;
    }),
})