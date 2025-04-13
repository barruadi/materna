import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Nakes } from '@prisma/client';
import { useSession } from 'next-auth/react';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { id } = body;
        const nakesList = await prisma.nakes.findMany({
            where: {
                id: id
            }
        });
        console.log("nakesList", nakesList);
    } catch (error) {
        console.error("Error retrieving nakes list:", error);
    }
}