import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { hash } from "bcrypt";
import { bigint } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
        email, 
        nama, 
        password,
        nip,
        kontak, 
        faskesId,
    } = body;

    // check if email already exist
    const existingUserEmail = await db.nakes.findUnique({
      where: { email },
    });
    if (existingUserEmail) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    // check if username already exist
    const existingUserUsername = await db.nakes.findUnique({
      where: { email },
    });
    if (existingUserUsername) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // hash password
    const hashedPassword = await hash(password, 10);

    // create user
    const user = await db.nakes.create({ 
      data: {
        email: email,
        nama: nama,
        nip: BigInt(nip) as bigint,
        password: hashedPassword,
        kontak: BigInt(kontak) as bigint,
        faskesId: faskesId,
      }
    });
    // exclude password
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {user: userWithoutPassword, meesage: "created success"},
      {status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "User creation failed" }, { status: 500 });
  }
}