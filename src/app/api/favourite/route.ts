import serverAuth from "@/lib/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Movie from "@/models/Movie";
import User from "@/models/User";

export async function POST(req: NextRequest) {
    try {
        await connectToDB(); // 1. CONECTAR PRIMERO
        const currentUser = await serverAuth(); // 2. BUSCAR USUARIO DESPUÉS

        const { movieId } = await req.json();
        const isMovieExist = await Movie.findById(movieId);

        if (!isMovieExist) {
            return NextResponse.json(
                { message: "Invalid movie ID" },
                { status: 400 }
            );
        }

        await User.updateOne(
            { email: currentUser.email },
            { $addToSet: { favourites: movieId } }
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
        await connectToDB(); // 1. CONECTAR PRIMERO
        const currentUser = await serverAuth(); // 2. BUSCAR USUARIO DESPUÉS

        const { movieId } = await req.json();
        const isMovieExist = await Movie.findById(movieId); 

        if (!isMovieExist) {
            return NextResponse.json(
                { message: "Invalid movie ID" },
                { status: 400 }
            );
        }

        await User.updateOne(
            { email: currentUser.email },
            { $pull: { favourites: movieId } }
        );

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