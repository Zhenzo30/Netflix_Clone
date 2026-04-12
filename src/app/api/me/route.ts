import { NextResponse } from "next/server";
import serverAuth from "@/lib/serverAuth";

export async function GET() {
    try {
        const { currentUser } = await serverAuth(); // Corregido espacio

        return NextResponse.json({ user: currentUser }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}