import { format } from "path";
import { z } from "zod";
import { HistoryUserProps } from "~/app/_types/types";

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

            const historyByDate = history.reduce((groups: Record<string, HistoryUserProps[]>, history) => {
                const dateKey = history.createdAt.toISOString().split('T')[0] || 0;
      
                if (!groups[dateKey]) groups[dateKey] = [];
      
                groups[dateKey].push({
                    riwayatId: history.id,
                    faskes: history.faskesId,
                    nakes: history.nakesId,
                    resiko: "rendah",
                });
      
                return groups;
            }, {});
      
            // Format as array
            const formattedResponse = Object.entries(historyByDate).map(([dateStr, history]) => ({
                tanggal: new Date(dateStr),
                history: history,
            }));

            return formattedResponse;
        }),

    getHistoryDetailById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input, ctx }) => {
            const history = await ctx.db.riwayat.findUnique({
                where: { id: input.id },
            });
        return history;
    }),

    getNakesByHistoyId: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input, ctx }) => {
            const nakes = await ctx.db.nakes.findUnique({
                where: { id: input.id },
        });
        return nakes;
    }),
})