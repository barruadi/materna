import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import bcrypt from "bcrypt";

export const authRouter = createTRPCRouter({
  signup: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string().min(6) }))
    .mutation(async ({ input }) => {
      const existing = await db.user.findUnique({ where: { email: input.email } });
      if (existing) throw new Error("Email sudah terdaftar");

      const hashedPassword = await bcrypt.hash(input.password, 10);
      const user = await db.user.create({
        data: {
          email: input.email,
          password: hashedPassword,
        },
      });
      return { success: true, user };
    }),

  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ input }) => {
      const user = await db.user.findUnique({ where: { email: input.email } });
      if (!user) throw new Error("Email tidak ditemukan");

      const valid = await bcrypt.compare(input.password, user.password);
      if (!valid) throw new Error("Password salah");

      return { success: true, user };
    }),
});
