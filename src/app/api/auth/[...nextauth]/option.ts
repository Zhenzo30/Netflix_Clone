import { connectToDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { 
                    label: "Email",
                     type: "text" 
                },
                password: { 
                    label: "Password",
                     type: "password" 
                 },
            },
                async authorize(credentials) {
                    if (!credentials?.email || !credentials.password) {
                        throw new Error("Email and password are required");
                    }
                    try {
                        await connectToDB();
    
                        const user = await User.findOne({ email: credentials.email });
    
                        if (!user) {
                            throw new Error("User does not exist");
                        }
    
                        const isPasswordValid = await bcrypt.compare(
                            credentials.password, 
                            user.password
                        );
                        if (!isPasswordValid) {
                            throw new Error("Invalid password or email");
                        }
                        return user;
                    } catch (error) {
                        throw error;
                    }
                }
            }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        ],
        pages: {
            signIn: "/login",
        },
        secret: process.env.AUTH_SECRET,
        session: {
            strategy: "jwt",
        },
    };