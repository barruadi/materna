// src/app/api/riwayat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { api } from '~/trpc/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    console.log("Data received:", data);
    
    // Convert date strings to Date objects
    const createdAt = data.createdAt ? dayjs(data.createdAt).toDate() : new Date();
    const tanggalMenstruasiTerakhir = data.tanggalMenstruasiTerakhir ? dayjs(data.tanggalMenstruasiTerakhir).toDate() : null;
    const tanggalPerkiraanLahir = data.tanggalPerkiraanLahir ? dayjs(data.tanggalPerkiraanLahir).toDate() : null;
    const tanggalKontrolKembali = data.tanggalKontrolKembali ? dayjs(data.tanggalKontrolKembali).toDate() : null;
    
    const riwayat = await prisma.riwayat.create({
        data: {
          pasienId: data.pasienId,
          nakesId: data.nakesId,
          faskesId: data.faskesId,
          createdAt: createdAt,
          pemeriksaan: {
            create: {
              anamnesis: data.pemeriksaan.anamnesis,
              beratBadan: data.pemeriksaan.beratBadan ? parseFloat(data.pemeriksaan.beratBadan) : null,
              tinggiBadan: data.pemeriksaan.tinggiBadan ? parseFloat(data.pemeriksaan.tinggiBadan) : null,
              tekananDarahSistole: data.pemeriksaan.tekananDarahSistole ? parseFloat(data.pemeriksaan.tekananDarahSistole) : null,
              tekananDarahDiastole: data.pemeriksaan.tekananDarahDiastole ? parseFloat(data.pemeriksaan.tekananDarahDiastole) : null,
              tinggiFundusUteri: data.pemeriksaan.tinggiFundusUteri ? parseFloat(data.pemeriksaan.tinggiFundusUteri) : null,
              n: data.pemeriksaan.n,
              lingkarLenganAtas: data.pemeriksaan.lingkarLenganAtas ? parseFloat(data.pemeriksaan.lingkarLenganAtas) : null,
              statusGizi: data.pemeriksaan.statusGizi,
              refleksPatella: data.pemeriksaan.refleksPatella,
              denyutJantungJanin: data.pemeriksaan.denyutJantungJanin ? parseFloat(data.pemeriksaan.denyutJantungJanin) : null,
              kepalaTerhadapPAP: data.pemeriksaan.kepalaTerhadapPAP ? parseFloat(data.pemeriksaan.kepalaTerhadapPAP) : null,
              taksiranBeratJanin: data.pemeriksaan.taksiranBeratJanin ? parseFloat(data.pemeriksaan.taksiranBeratJanin) : null,
              presentasi: data.pemeriksaan.presentasi
            }
          },
          pelayanan: {
            create: {
              injeksiTT: data.pelayanan.injeksiTT ? parseFloat(data.pelayanan.injeksiTT) : null,
              catatDiBukuKIA: data.pelayanan.catatDiBukuKIA,
              fe: data.pelayanan.fe ? parseFloat(data.pelayanan.fe) : null
            }
          },
          laboratorium: {
            create: {
              hemoglobin: data.laboratorium.hemoglobin ? parseFloat(data.laboratorium.hemoglobin) : null,
              proteinUrine: data.laboratorium.proteinUrine ? parseFloat(data.laboratorium.proteinUrine) : null,
              gulaDarah: data.laboratorium.gulaDarah ? parseFloat(data.laboratorium.gulaDarah) : null,
              talasemia: data.laboratorium.talasemia,
              sifilis: data.laboratorium.sifilis,
              hbsAg: data.laboratorium.hbsAg
            }
          },
          integrasi: {
            create: {
              ibuHamilDenganHIV: data.integrasi.ibuHamilDenganHIV,
              ibuHamilDitawarkanTes: data.integrasi.ibuHamilDitawarkanTes,
              ibuHamilDitesHIV: data.integrasi.ibuHamilDitesHIV,
              hasilTesHIV: data.integrasi.hasilTesHIV,
              ibuHamilMendapatART: data.integrasi.ibuHamilMendapatART,
              rdtDarah: data.integrasi.rdtDarah,
              mikroskopisDarah: data.integrasi.mikroskopisDarah,
              ibuHamilDiperiksaDahak: data.integrasi.ibuHamilDiperiksaDahak,
              ibuHamilHasil: data.integrasi.ibuHamilHasil,
              persalinanPervaginam: data.integrasi.persalinanPervaginam,
              persalinanPerabdominam: data.integrasi.persalinanPerabdominam,
              ibuHamilDiperiksaKelambu: data.integrasi.ibuHamilDiperiksaKelambu,
              ibuHamilMendapatKinaACT: data.integrasi.ibuHamilMendapatKinaACT,
              rdtMalaria: data.integrasi.rdtMalaria,
              mikroskopisMalaria: data.integrasi.mikroskopisMalaria,
              ibuHamilDiperiksaAnkilostoma: data.integrasi.ibuHamilDiperiksaAnkilostoma,
              ibuHamilHasilTesAnkilostoma: data.integrasi.ibuHamilHasilTesAnkilostoma,
              ibuHamilDiperiksaHepatitis: data.integrasi.ibuHamilDiperiksaHepatitis,
              ibuHamilHasilTesHepatitis: data.integrasi.ibuHamilHasilTesHepatitis
            }
          },
          rujukan: {
            create: {
              puskesmas: data.rujukan.puskesmas,
              rumahBersalin: data.rujukan.rumahBersalin,
              rsiaRsb: data.rujukan.rsiaRsb,
              rumahSakit: data.rujukan.rumahSakit,
              lainLain: data.rujukan.lainLain,
              keadaanTiba: data.rujukan.keadaanTiba,
              keadaanPulang: data.rujukan.keadaanPulang
            }
          },
          lainnya: {
            create: {
              statusImunisasi: data.lainnya.statusImunisasi,
              konseling: data.lainnya.konseling,
              risikoTerdeteksiOleh: data.lainnya.risikoTerdeteksiOleh,
              komplikasi: data.lainnya.komplikasi,
              tanggalMenstruasiTerakhir: data.lainnya.tanggalMenstruasiTerakhir,
              tanggalPerkiraanLahir: data.lainnya.tanggalPerkiraanLahir,
              tanggalKontrolKembali: data.lainnya.tanggalKontrolKembali
            }
          }
        }
      });
      

    return NextResponse.json({ 
      success: true, 
      message: "Riwayat berhasil disimpan", 
      data: { id: riwayat.id } 
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error saving riwayat:', error);
    return NextResponse.json({ 
      success: false, 
      message: "Terjadi kesalahan saat menyimpan riwayat", 
      error: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}