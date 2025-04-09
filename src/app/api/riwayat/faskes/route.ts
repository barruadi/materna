// src/app/api/pasien/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const faskesList = await prisma.faskes.findMany({
      select: {
        id: true,
        namaFaskes: true,
      },
      orderBy: {
        namaFaskes: 'asc'
      }
    });
    
    // Format data for Ant Design Select
    const options = faskesList.map(faskes => ({
      value: faskes.id,
      label: faskes.namaFaskes
    }));
    
    return NextResponse.json({ 
      success: true, 
      data: options 
    });
    
  } catch (error) {
    console.error('Error fetching faskes data:', error);
    return NextResponse.json({ 
      success: false, 
      message: "Gagal memuat data fasilitas kesehatan", 
      error: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}