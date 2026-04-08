"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Profiles = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleProfileClick = () => {
    router.push("/");
    };

  return (
    <div className="flex w-full h-screen justify-center items-center flex-col gap-8">
      <h1 className="text-white text-[50.4px]">Who's Watching?</h1>
      
      {/* 1. Agregué w-[160px] y items-center para fijar el ancho */}
      <div className="flex flex-col items-center w-[160px] gap-3">
        
        <div className="border-[3.24px] border-[#e5e5e5] rounded-sm overflow-hidden cursor-pointer"
        onClick={handleProfileClick}
        >
          <Image
            src="/assets/profile.png"
            height={144}
            width={144}
            alt="profile"
            className="object-cover" // 2. object-cover por si la imagen se distorsiona
          />
        </div>
        
        {/* 3. Agregué break-words para que el texto haga salto de línea */}
        <h3 className="text-[#e5e5e5] text-[18.72px] text-center break-words">
          {session?.user?.name || "Loading..."}
        </h3>

      </div>
    </div>
  );
};

export default Profiles;