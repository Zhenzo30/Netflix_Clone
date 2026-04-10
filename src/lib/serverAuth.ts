import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";

const serverAuth = async () => {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            throw new Error("No hay sesión en getServerSession");
        }

        const currentUser = await User.findOne({ email: session.user?.email });
        if (!currentUser) {
            throw new Error("No se encontró el usuario en la BD");
        }

        return currentUser;
    } catch (error) {
        // ESTA ES LA LÍNEA NUEVA. Nos dirá qué está fallando realmente.
        console.error("❌ DETALLE DEL ERROR EN SERVER AUTH:", error);
        throw new Error("Unauthorized");
    }
};

export default serverAuth;