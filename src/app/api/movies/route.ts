import { connectToDB } from "@/lib/db";
import Movie from "@/models/Movie";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDB();

        const movies = await Movie.find({});

        return NextResponse.json({ movies }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Failed to fetch movies" },
            { status: 500 });
    }
}