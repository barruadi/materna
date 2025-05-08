"use client";

import { 
  FormEvent, 
  useState, 
  useEffect 
} from "react";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("nakes"); 
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const signInData = await signIn(type, {
        email: email,
        password: password,
        redirect: false,
    });
    if (signInData?.error) {
        console.log("Login failed");
    } else {
        console.log("Login success");
        if (type === "pasien") {
            console.log("Login pasien success");
            router.push("/pasien");
        } else if (type === "nakes") {
            router.push("/admin");
        }
    }
}

  // get login type
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const type = params.get("type");
      console.log(type);
      if (type){
        setType(type);
      }
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-2xl font-bold">Login {type}</h1>
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
      <button onClick={handleLogin} className="bg-[#FFE5A6] text-black px-4 py-2 rounded">
        Login
      </button>
      <span className="text-sm">Belum punya akun? <a 
          href={`/signup-${type}`}
          className="font-bold text-[#de665b] underline"
        >
            Daftar di sini!</a></span>
    </div>
  );
}
