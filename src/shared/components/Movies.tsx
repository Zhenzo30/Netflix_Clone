"use client";
import { IMovie } from "@/types/movie.types";
import Image from "next/image";

const Movies = ({ movies, label }: { movies: IMovie[]; label: string }) => {
    return (
        <div className="flex flex-col gap-2 relative my-[3vw] px-[4%]">
            {movies.length ?  <h2 className="text-[#e5e5e5] font-medium text-xl">{label}</h2> : null}
            <div className="flex gap-2">
                {movies.map((movie) => (
                    <div key={movie._id} className="relative cursor-pointer">
                        <div className="relative cursor-pointer w-[250px] h-[140px] rounded-sm transition duration-300 ease-in-out">
                            <Image
                                src={movie.thumbnailUrl}
                                className="object-cover"
                                alt={movie.title}
                                fill
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Movies;