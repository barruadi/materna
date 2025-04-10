import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const taskRouter = createTRPCRouter({
  getTasksByPatient: publicProcedure
    .input(z.object({ pasienId: z.string() }))
    .query(async ({ input, ctx }) => {
      const dailyTasks = await ctx.db.dailyTasks.findMany({
        where: { pasienId: input.pasienId },
        orderBy: { date: 'desc' },
      });

      // Group by date
      const tasksByDate = dailyTasks.reduce((groups: Record<string, any[]>, task) => {
        const dateKey = task.date.toISOString().split('T')[0] || 0;

        if (!groups[dateKey]) groups[dateKey] = [];

        groups[dateKey].push({
          id: task.id,
          title: task.title,
          description: task.description,
          status: task.status ?? false,
        });

        return groups;
      }, {});

      // Format as array
      const formattedResponse = Object.entries(tasksByDate).map(([dateStr, tasks]) => ({
        tanggal: new Date(dateStr),
        dailyTask: tasks,
      }));

      return formattedResponse;
    }),
});