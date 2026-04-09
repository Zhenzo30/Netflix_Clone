"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { IMovie } from "@/types/movie.types";

const Billboard = () => {
    const [randomMovie, setRandomMovie] = useState<IMovie | null>(null);

    const fetchMovies = async () => {
        try {
            const { data } = await axios.get("/api/movies");
            const randomNum = Math.floor(Math.random() * data.length);
            setRandomMovie(data[randomNum]);
        } catch (error) {
            console.log(error);
        } // <- Se cierra el catch
    }; // <- Se cierra la función fetchMovies AQUÍ

    useEffect(() => {
        fetchMovies();
    }, []); // <- El useEffect ahora está en el nivel principal del componente

    console.log("Random Movie: ", randomMovie);

    return <div className="h-screen relative">Billboard</div>;
}; // <- Se cierra el componente Billboard

export default Billboard;