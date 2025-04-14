// import { z } from "zod";
// import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
// import { db } from "~/server/db";

// export const pasienRouter = createTRPCRouter({
//     createPasien: publicProcedure
//       .input(
//         z.object({
//           email: z.string().email(),
//           password: z.string().min(6),
//           nama: z.string(),
//           nik: z.number(),
//           tanggalLahir: z.string(), // Format ISO (YYYY-MM-DD)
//           fotoProfil: z.string().optional(),
//           golonganDarah: z.string(),
//         })
//       )
//       .mutation(async ({ input }) => {
//         return db.pasien.create({
//           data: {
//             ...input,
//             tanggalLahir: new Date(input.tanggalLahir), // Konversi string ke Date
//           },
//         });
//       }),
  
//     getAllPasien: publicProcedure.query(async () => {
//       return db.pasien.findMany();
//     }),
//   });
  
