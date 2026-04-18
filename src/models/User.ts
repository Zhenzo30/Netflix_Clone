import { Schema, model, models} from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String,
    },
    image: { 
        type: String 
    },
    // Legacy top-level favourites (kept for backward-compatibility / migration).
    favourites: [
        {
            type: Schema.Types.ObjectId,
            ref: "Movie",
        }
    ],
    // New profiles array: each account can have multiple profiles (max 5 enforced in API)
    profiles: [
        {
            name: { type: String, required: true },
            avatar: { type: String },
            preferences: [{ type: String }],
            favourites: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "Movie",
                }
            ],
            createdAt: { type: Date, default: Date.now }
        }
    ],
    // Currently selected profile id (references subdocument _id)
    activeProfile: {
        type: Schema.Types.ObjectId,
        default: null
    }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if(this.password && this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

const User = models?.User || model("User", userSchema);

export default User;