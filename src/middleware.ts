import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req });
    const pathname = req.nextUrl.pathname;

    // 1. Si NO hay token y NO estás en signup o login -> Manda a login
    if (!token && pathname !== "/signup" && pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // 2. Si HAY token y estás en login o signup -> Manda a la página principal
    if (token && (pathname === "/login" || pathname === "/signup")) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // 3. Si no pasa nada de lo anterior (ej: estás en /login sin token), deja pasar
    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/login", "/signup", "/profiles"]
};