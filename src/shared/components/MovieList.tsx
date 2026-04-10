import axios from "axios";
import { useState, useEffect } from "react";
import { IMovie } from "@/types/movie.types";


const MovieList = () => {  

    const [movies, setMovies] = useState<IMovie[]>([]);

    const fetchMovies = async () => {
        try {
            const { data } = await axios.get("/api/movies");
            setMovies(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return <Movies movies={movies} label="Top Movies"/>;
};

export default MovieList;