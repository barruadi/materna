import { set, z } from "zod";
import { DailyTaskProps } from "~/app/_types/types";

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
      const tasksByDate = dailyTasks.reduce((groups: Record<string, DailyTaskProps[]>, task) => {
        const dateKey = task.date.toISOString().split('T')[0] || 0;

        if (!groups[dateKey]) groups[dateKey] = [];

        groups[dateKey].push({
          id: task.id,
          title: task.title,
          description: task.description ?? "",
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
  
  getTaskByPatientToday: publicProcedure
    .input(z.object({ pasienId: z.string() }))
    .query(async ({ input, ctx }) => {
      const today = new Date();
      const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

      const dailyTasks = await ctx.db.dailyTasks.findMany({
        where: {
          pasienId: input.pasienId,
          date: {
            gte: startOfToday,
            lt: endOfToday,
          },
        },
        orderBy: { date: 'desc' },
      });

      if (dailyTasks.length === 0) {
        return [];
      }

      return dailyTasks.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description ?? "",
        status: task.status ?? false,
      }));
    }),

    setTaskStatus: publicProcedure
      .input(z.object({ taskId: z.string() }))
      .mutation(async ({ input, ctx }) => {
        const task = await ctx.db.dailyTasks.findUnique({
          where: { id: input.taskId },
        });

        if (!task) {
          throw new Error("Task not found");
        }

        const updatedTask = await ctx.db.dailyTasks.update({
          where: { id: input.taskId },
          data: { status: !task.status },
        });

        return updatedTask;
      }),
});