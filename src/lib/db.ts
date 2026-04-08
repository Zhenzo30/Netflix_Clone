import mongoose from "mongoose";

// BORRA O COMENTA ESTA LÍNEA: 
// const MONGO_URI = process.env.MONGO_URI!;

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDB() {
    // 1. LÉELA DENTRO DE LA FUNCIÓN:
    const MONGO_URI = process.env.MONGO_URI!;

    // 2. (Opcional pero recomendado) Un pequeño check por si acaso:
    if (!MONGO_URI) {
        throw new Error("Por favor, define MONGO_URI en tu archivo .env.local");
    }

    if (cached.conn) {
        return cached.conn;
    }
    
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGO_URI, {bufferCommands: true, maxPoolSize: 10,}).then(() => mongoose.connection);
    }
    
    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw error;
    }
    
    return cached.conn;
}

export { connectToDB };