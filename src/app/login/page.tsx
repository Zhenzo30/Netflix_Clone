"use client";
import { useState } from "react";
import { Input } from "@/shared/ui/Input";
import Link from "next/link";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

const Login = () => {
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });
      if (!response?.ok) {
        toast.error(response?.error);
        return;
      }

      router.push("/");
    } catch (error) {
      console.log(error);
    }
    };

    return (

    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center bg-black loginContainer">
      <div className="max-w-[480px] w-full bg-[#000000b3] rounded-sm py-12 px-16 font-bold text-[2rem] text-white flex flex-col gap-5 z-50">
        <h1>Sign Up</h1>
        <Input type="email" 
        placeholder="Email" 
        className="py-6 px-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <Input type="password" 
        placeholder="Password" 
        className="py-6 px-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <button className="cursor-pointer w-full bg-[#e50914] text-base font-medium rounded-lg py-2.5" onClick={handleLogin}>Sign Up</button>
        <p className="text-base text-[#FFFFFFb3] text-center">OR</p>
        <div className="flex items-center justify-center gap-4">
          <FcGoogle className="cursor-pointer w-10 h-10"/>
          <BsGithub className="cursor-pointer w-10 h-10"/>
        </div>
        <div>
          <span className="text-[#ffffffb3] text-base font-normal">New to Netflix? {" "}</span>
          <Link href="/signup" className="text-white font-medium text-base">Sign Up</Link>
        </div>
      </div>
    </div>
    )
}

export default Login;