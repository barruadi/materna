import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const pasienList = await prisma.pasien.findMany({
      select: {
        id: true,
        nama: true,
      },
      orderBy: {
        nama: 'asc'
      }
    });
    
    // Format data for Ant Design Select
    const options = pasienList.map(pasien => ({
      value: pasien.id,
      label: pasien.nama
    }));
    
    return NextResponse.json({ 
      success: true, 
      data: options 
    });
    
  } catch (error) {
    console.error('Error fetching pasien data:', error);
    return NextResponse.json({ 
      success: false, 
      message: "Gagal memuat data pasien", 
      error: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}