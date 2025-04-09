
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: FormEvent) =>{
    e.preventDefault();
    const signInData = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
    });
    
    if (signInData?.error) {
        console.log("Login failed");
    } else {
        console.log("Login success");
        router.push("/");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="bg-green-500 text-white px-4 py-2 rounded">
        Login
      </button>
    </div>
  );
}
