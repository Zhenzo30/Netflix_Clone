"use client";
import { SparkleIcon } from "lucide-react";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./DropdownMenu";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {

    const {data: session} = useSession();

    return (
    <div className="fixed top-0 w-full flex justify-between px-12 py-4 bg-transparent transition-colors duration-1000">
        <div className="flex gap-8 items-center">
            <h1 className="text-[#e50914] cursor-pointer text-[25px]">Netflix</h1>
            <ul className="flex text-sm gap-5">
                <li className="text-[#e5e5e5] cursor-pointer hover:text-[#b3b3b3] transition-colors">Home</li>
                <li className="text-[#e5e5e5] cursor-pointer hover:text-[#b3b3b3] transition-colors">Shows</li>
                <li className="text-[#e5e5e5] cursor-pointer hover:text-[#b3b3b3] transition-colors">Movies</li>
                <li className="text-[#e5e5e5] cursor-pointer hover:text-[#b3b3b3] transition-colors">Games</li>
            </ul>
        </div>
        <div className="flex gap-[15px] items-center">
            <button className="cursor-pointer">
                <SparkleIcon className="text-white" />
            </button>
            <Image 
            src = "/assets/search.svg"
            width={24}
            height={24}
            alt = "Search"
            />
            <Image 
            src = "/assets/notification.svg"
            width={24}
            height={24}
            alt = "Notification"
            />
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <button className="text-white cursor-pointer">
                        <Image  
                        src= "/assets/profile.png"
                        width={32}
                        height={32}
                        alt="Profile"
                        className="rounded-[4px]"
                        />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#000000e6] text-white border-none w-[200px]">
                    <DropdownMenuGroup>
                        {/* ---> AQUÍ ESTÁN LOS CAMBIOS <--- */}
                        <DropdownMenuItem className="flex items-center gap-3">
                            <Image 
                            src="/assets/profile.png"
                            width={32}
                            height={32}
                            alt="Profile"
                            className="rounded-[4px] shrink-0" // shrink-0 evita que la imagen se deforme si el texto es largo
                            />
                            <span className="truncate">{session?.user?.name}</span>
                        </DropdownMenuItem>
                        {/* -------------------------------- */}
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="bg-[#ffffff40]" />    
                    <DropdownMenuGroup>
                        <DropdownMenuItem className="text-[13px] px-2.5 py-2 flex justify-between" onClick={() => signOut()}>
                            Sign Out of Netflix
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>
    )
};

export default Navbar;