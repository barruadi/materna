// src/app/api/pasien/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const nakesList = await prisma.nakes.findMany({
      select: {
        id: true,
        nama: true,
      },
      orderBy: {
        nama: 'asc'
      }
    });
    
    // Format data for Ant Design Select
    const options = nakesList.map(nakes => ({
      value: nakes.id,
      label: nakes.nama
    }));
    
    return NextResponse.json({ 
      success: true, 
      data: options 
    });
    
  } catch (error) {
    console.error('Error fetching nakes data:', error);
    return NextResponse.json({ 
      success: false, 
      message: "Gagal memuat data tenaga kesehatan", 
      error: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}