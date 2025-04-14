import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import dayjs from "dayjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const riwayatRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        pasienId: z.string(),
        nakesId: z.string(),
        faskesId: z.string(),
        createdAt: z.string().optional(),
        pemeriksaan: z.object({
          anamnesis: z.string(),
          beratBadan: z.string().optional(),
          tinggiBadan: z.string().optional(),
          tekananDarahSistole: z.string().optional(),
          tekananDarahDiastole: z.string().optional(),
          tinggiFundusUteri: z.string().optional(),
          n: z.string(),
          lingkarLenganAtas: z.string().optional(),
          statusGizi: z.string(),
          refleksPatella: z.string(),
          denyutJantungJanin: z.string().optional(),
          kepalaTerhadapPAP: z.string().optional(),
          taksiranBeratJanin: z.string().optional(),
          presentasi: z.string()
        }),
        pelayanan: z.object({
          injeksiTT: z.string().optional(),
          catatDiBukuKIA: z.string(),
          fe: z.string().optional()
        }),
        laboratorium: z.object({
          hemoglobin: z.string().optional(),
          proteinUrine: z.string().optional(),
          gulaDarah: z.string().optional(),
          talasemia: z.string(),
          sifilis: z.string(),
          hbsAg: z.string()
        }),
        integrasi: z.object({
          ibuHamilDenganHIV: z.string(),
          ibuHamilDitawarkanTes: z.string(),
          ibuHamilDitesHIV: z.string(),
          hasilTesHIV: z.string(),
          ibuHamilMendapatART: z.string(),
          rdtDarah: z.string(),
          mikroskopisDarah: z.string(),
          ibuHamilDiperiksaDahak: z.string(),
          ibuHamilHasil: z.string(),
          persalinanPervaginam: z.string(),
          persalinanPerabdominam: z.string(),
          ibuHamilDiperiksaKelambu: z.string(),
          ibuHamilMendapatKinaACT: z.string(),
          rdtMalaria: z.string(),
          mikroskopisMalaria: z.string(),
          ibuHamilDiperiksaAnkilostoma: z.string(),
          ibuHamilHasilTesAnkilostoma: z.string(),
          ibuHamilDiperiksaHepatitis: z.string(),
          ibuHamilHasilTesHepatitis: z.string()
        }),
        rujukan: z.object({
          puskesmas: z.string(),
          rumahBersalin: z.string(),
          rsiaRsb: z.string(),
          rumahSakit: z.string(),
          lainLain: z.string(),
          keadaanTiba: z.string(),
          keadaanPulang: z.string()
        }),
        lainnya: z.object({
          statusImunisasi: z.string(),
          konseling: z.string(),
          risikoTerdeteksiOleh: z.string(),
          komplikasi: z.string(),
          tanggalMenstruasiTerakhir: z.string().optional(),
          tanggalPerkiraanLahir: z.string().optional(),
          tanggalKontrolKembali: z.string().optional()
        }),
      })
    )
    .mutation(async ({ input }) => {
      const createdAt = input.createdAt ? dayjs(input.createdAt).toDate() : new Date();
      const tanggalMenstruasiTerakhir = input.lainnya.tanggalMenstruasiTerakhir ? dayjs(input.lainnya.tanggalMenstruasiTerakhir).toDate() : null;
      const tanggalPerkiraanLahir = input.lainnya.tanggalPerkiraanLahir ? dayjs(input.lainnya.tanggalPerkiraanLahir).toDate() : null;
      const tanggalKontrolKembali = input.lainnya.tanggalKontrolKembali ? dayjs(input.lainnya.tanggalKontrolKembali).toDate() : null;

      const riwayat = await prisma.riwayat.create({
        data: {
          pasienId: input.pasienId,
          nakesId: input.nakesId,
          faskesId: input.faskesId,
          createdAt,
          pemeriksaan: {
            create: {
              anamnesis: input.pemeriksaan.anamnesis,
              beratBadan: parseFloat(input.pemeriksaan.beratBadan ?? "0"),
              tinggiBadan: parseFloat(input.pemeriksaan.tinggiBadan ?? "0"),
              tekananDarahSistole: parseFloat(input.pemeriksaan.tekananDarahSistole ?? "0"),
              tekananDarahDiastole: parseFloat(input.pemeriksaan.tekananDarahDiastole ?? "0"),
              tinggiFundusUteri: parseFloat(input.pemeriksaan.tinggiFundusUteri ?? "0"),
              n: input.pemeriksaan.n,
              lingkarLenganAtas: parseFloat(input.pemeriksaan.lingkarLenganAtas ?? "0"),
              statusGizi: input.pemeriksaan.statusGizi,
              refleksPatella: input.pemeriksaan.refleksPatella,
              denyutJantungJanin: parseFloat(input.pemeriksaan.denyutJantungJanin ?? "0"),
              kepalaTerhadapPAP: parseFloat(input.pemeriksaan.kepalaTerhadapPAP ?? "0"),
              taksiranBeratJanin: parseFloat(input.pemeriksaan.taksiranBeratJanin ?? "0"),
              presentasi: input.pemeriksaan.presentasi,
            }
          },
          pelayanan: {
            create: {
              injeksiTT: parseFloat(input.pelayanan.injeksiTT ?? "0"),
              catatDiBukuKIA: input.pelayanan.catatDiBukuKIA,
              fe: parseFloat(input.pelayanan.fe ?? "0"),
            }
          },
          laboratorium: {
            create: {
              hemoglobin: parseFloat(input.laboratorium.hemoglobin ?? "0"),
              proteinUrine: parseFloat(input.laboratorium.proteinUrine ?? "0"),
              gulaDarah: parseFloat(input.laboratorium.gulaDarah ?? "0"),
              talasemia: input.laboratorium.talasemia,
              sifilis: input.laboratorium.sifilis,
              hbsAg: input.laboratorium.hbsAg,
            }
          },
          integrasi: {
            create: input.integrasi
          },
          rujukan: {
            create: input.rujukan
          },
          lainnya: {
            create: {
              statusImunisasi: input.lainnya.statusImunisasi,
              konseling: input.lainnya.konseling,
              risikoTerdeteksiOleh: input.lainnya.risikoTerdeteksiOleh,
              komplikasi: input.lainnya.komplikasi,
              tanggalMenstruasiTerakhir,
              tanggalPerkiraanLahir,
              tanggalKontrolKembali,
            }
          },
        },
      });

      return {
        success: true,
        message: "Riwayat berhasil disimpan",
        data: { id: riwayat.id }
      };
    }),
});
