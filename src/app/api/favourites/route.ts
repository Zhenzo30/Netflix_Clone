import serverAuth from "@/lib/serverAuth";
import { connectToDB } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const { currentUser } = await serverAuth();

        await connectToDB();

        const user = await User.findOne({ email: currentUser.email }).populate("favourites");

        return NextResponse.json({ favourites: user.favourites }, { status: 200 });

    } catch (error) { // <- Corregido: un solo espacio y espacio antes del paréntesis
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    } // <- Corregido: Alineado con el "try"
} // <- Corregido: Alineado con "export"