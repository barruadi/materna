"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";

export default function MainLoginPage() {
    return (
    <div className="border flex flex-col items-center justify-center min-h-screen">
        <h1 className="font-black text-xl">Selamat datang di</h1>
        <img src="/logo-full.svg" alt="" className="mt-2" />
        <a href="/login?type=pasien" className="bg-[#FFE5A6] px-7 py-2 w-fit rounded-xl mt-4">
            Masuk sebagai Pasien
        </a>
        <a href="/login?type=nakes" className="bg-[#FFE5A6] px-7 py-2 w-fit rounded-xl mt-4">
            Masuk sebagai Nakes
        </a>
    </div>
  );
}
