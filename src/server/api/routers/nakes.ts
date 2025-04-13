import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { differenceInYears } from "date-fns";

export const nakesRouter = createTRPCRouter({
  getCurrentNakes: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const nakes = await ctx.db.nakes.findUnique({
      where: { id: userId },
      include: {
        faskes: true, // jika ingin info faskes juga
      },
    });

    if (!nakes) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Tenaga kesehatan tidak ditemukan",
      });
    }

    return nakes;
  }),

  getPasienDariRiwayat: protectedProcedure.query(async ({ ctx }) => {
    const nakesId = ctx.session.user.id;
    console.log("Nakes IDD:", nakesId);

    const riwayat = await ctx.db.riwayat.findMany({
      where: { nakesId },
      include: {
        pasien: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const pasienDisplayData = riwayat.map((entry) => {
        const pasien = entry.pasien;
        const umur = differenceInYears(new Date(), pasien.tanggalLahir);
      
        return {
          key: entry.id,
          id: pasien.id,
          nama: pasien.nama,
          umur,
          golonganDarah: pasien.golonganDarah,
          statusResiko: pasien.statusResiko,
          jadwalKunjungan: entry.createdAt,
          tanggalLahir: pasien.tanggalLahir,
          kontak: pasien.kontak,
          lastVisit: entry.createdAt,
        };
      });

    console.log("Formatted pasien data:", pasienDisplayData);  

    return pasienDisplayData;
  }),

  
});



