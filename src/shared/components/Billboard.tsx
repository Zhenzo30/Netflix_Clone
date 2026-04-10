"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react"; // <-- Importamos useSession
import { IMovie } from "@/types/movie.types";
import Image from "next/image";

const Billboard = () => {
    const [randomMovie, setRandomMovie] = useState<IMovie | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    
    // <-- El semáforo
    const { status } = useSession();

    const fetchMovies = async () => {
        try {
            const { data } = await axios.get("/api/movies");
            if (Array.isArray(data) && data.length > 0) {
                const randomNum = Math.floor(Math.random() * data.length);
                setRandomMovie(data[randomNum]);
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    const handlePlayButtonClick = () => {
        if (videoRef.current) {
            videoRef.current.requestFullscreen();
        }
    };


    useEffect(() => {
        // Solo disparamos la petición SI el estado es "authenticated" (Ya está logueado)
        if (status === "authenticated") {
            fetchMovies();
        }
    }, [status]); // Se ejecuta cada vez que el estado de la sesión cambie

    // Mientras NextAuth verifica quién es, mostramos "Cargando..."
    if (status === "loading") {
        return (
            <div className="h-screen relative bg-black">
                <div className="w-full h-full flex items-center justify-center">
                    <p className="text-white text-2xl animate-pulse">Cargando...</p>
                </div>
            </div>
        );
    }

    return (

        <div>
            <video 
                src={randomMovie?.videoUrl}
                poster={randomMovie?.thumbnailUrl}
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
            />
            <div
                className="absolute top-1/2 left-10 -translate-y-1/2 transform flex flex-col gap-4"
            >
                <h1 className="text-5xl text-white font-bold">{randomMovie?.title}</h1>
                <p className="text-white text-lg">{randomMovie?.description}</p>
                <div className="flex gap-2">
                    <button className="text-lg font-semibold bg-white py-2 px-5 text-black rounded-sm cursor-pointer flex gap-4 hover:bg-[#ffffffbf]" onClick={handlePlayButtonClick}>
                        <Image
                            src="/assets/play.svg"
                            width={24}
                            height={24}
                            alt="Play video"
                        />
                        Play
                    </button>
                    <button className="text-lg font-semibold bg-[#6d6d6eb3] py-2 px-5 text-white rounded-sm cursor-pointer flex gap-4 hover:bg-[#6d6d6e66]" >
                        <Image
                            src="/assets/info.svg"
                            width={24}
                            height={24}
                            alt="Play video"
                        />
                        More info
                    </button>
                </div>
            </div>
        </div>
        
    );
}; 

export default Billboard;