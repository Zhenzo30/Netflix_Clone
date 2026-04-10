import { connectToDB } from "@/lib/db";
import serverAuth from "@/lib/serverAuth";
import Movie from "@/models/Movie";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // 1. PRIMERO: Conectar a la base de datos
        await connectToDB();

        // 2. SEGUNDO: Verificar el usuario (ahora sí puede hacer el findOne sin explotar)
        await serverAuth();

        // 3. TERCERO: Obtener las películas
        const movies = await Movie.find({});

        return NextResponse.json(movies, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Failed to fetch movies" },
            { status: 500 }
        );
    }
}