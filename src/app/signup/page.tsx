"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [nama, setNama] = useState("");
  const [password, setPassword] = useState("");
  
  const router = useRouter();

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    console.log(nama, email, password);

    const response = await fetch("/api/pasien/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            email, 
            username: nama,
            password
        }),
    })

    if (!response.ok) {
        console.log("error");
        return;
    } else {
        console.log("success");
        const data = await response.json();
        console.log(data);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-2xl font-bold">Sign Up</h1>
      <form onSubmit={handleSignup} className="flex flex-col space-y-4">
        <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <input
            type="text"
            placeholder="Nama"
            className="border p-2 rounded"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
        />
        <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignup} className="bg-blue-500 text-white px-4 py-2 rounded">
            Sign Up
        </button>
      </form>
    </div>
  );
}