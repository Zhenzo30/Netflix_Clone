import { NextResponse } from "next/server";
import serverAuth from "@/lib/serverAuth";
import { connectToDB } from "@/lib/db"; // AGREGADO: Faltaba este import

export async function GET() {
    try {
        await connectToDB(); // 1. CONECTAR PRIMERO
        const currentUser = await serverAuth(); // 2. BUSCAR USUARIO DESPUÉS

        return NextResponse.json({ user: currentUser }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}