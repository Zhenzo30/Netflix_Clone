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
    favourites: [
        {
            type: Schema.Types.ObjectId,
            ref: "Movie",
        }
    ]
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if(this.password && this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

const User = models?.User || model("User", userSchema);

export default User;