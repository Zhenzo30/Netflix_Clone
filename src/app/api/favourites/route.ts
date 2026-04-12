import serverAuth from "@/lib/serverAuth";
import { connectToDB } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDB(); // 1. CONECTAR PRIMERO
        const currentUser = await serverAuth(); // 2. BUSCAR USUARIO DESPUÉS

        const user = await User.findOne({ email: currentUser.email }).populate("favourites");

        return NextResponse.json({ favourites: user.favourites }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}