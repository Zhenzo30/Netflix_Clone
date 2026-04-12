import serverAuth from "@/lib/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db"; // Corregido espacio aquí
import Movie from "@/models/Movie";
import User from "@/models/User";

export async function POST(req: NextRequest) {
    try {
        const { currentUser } = await serverAuth(); // Corregido espacio

        await connectToDB();

        const { movieID } = await req.json();
        const isMovieExist = await Movie.findById(movieID);

        if (!isMovieExist) {
            return NextResponse.json(
                { message: "Invalid movie ID" },
                { status: 400 }
            );
        }

        await User.updateOne(
            { email: currentUser.email },
            { $addToSet: { favourites: movieID } }
        );

        return NextResponse.json(
            { message: "Movie added to favourites successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { currentUser } = await serverAuth(); // Corregido espacio

        await connectToDB();

        const { movieID } = await req.json();
        // ERROR CORREGIDO: Faltaba completar la búsqueda en la base de datos
        const isMovieExist = await Movie.findById(movieID); 

        if (!isMovieExist) {
            return NextResponse.json(
                { message: "Invalid movie ID" },
                { status: 400 }
            );
        }

        await User.updateOne(
            { email: currentUser.email },
            { $pull: { favourites: movieID } }
        );

        // ERROR CORREGIDO: Faltaba retornar la respuesta de éxito
        return NextResponse.json(
            { message: "Movie removed from favourites successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}