import { model, models, Schema } from "mongoose";

const MovieSchema = new Schema(
    {
        title: { 
            type: String, 
            required: true 
        },
        description: { 
            type: String, 
            required: true 
        },
        videoURL: { 
            type: String, 
            required: true 
        },
        thumbnailURL: { 
            type: String, 
            required: true
        },
        genre: { 
            type: String, 
            required: true
        },
        duration: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
    }, // <--- 1. Cierras los campos con una coma
    { timestamps: true } // <--- 2. Abres un nuevo objeto para las opciones del Schema
);

const Movie = models?.Movie || model("Movie", MovieSchema); // <--- 4. Agregué la creación del modelo

export default Movie; // <--- 5. Te agregué el export del modelo