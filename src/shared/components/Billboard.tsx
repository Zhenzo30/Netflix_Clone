"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react"; // <-- Importamos useSession
import { IMovie } from "@/types/movie.types";

const Billboard = () => {
    const [randomMovie, setRandomMovie] = useState<IMovie | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    
    // <-- El semáforo
    const { data: session, status } = useSession();

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
        <div className="h-screen relative bg-black">
            {randomMovie ? (
                <video 
                    src={randomMovie.videoUrl} 
                    poster={randomMovie.thumbnailUrl}
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <p className="text-white text-2xl animate-pulse">Cargando película...</p>
                </div>
            )}
        </div>
    );
}; 

export default Billboard;