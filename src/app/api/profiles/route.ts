import { NextRequest, NextResponse } from "next/server";
import serverAuth from "@/lib/serverAuth";
import { connectToDB } from "@/lib/db";
import User from "@/models/User";

export async function GET() {
    try {
        await connectToDB();
        const currentUser = await serverAuth();

        const user = await User.findOne({ email: currentUser.email });

        return NextResponse.json({ profiles: user.profiles, activeProfile: user.activeProfile }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectToDB();
        const currentUser = await serverAuth();

        const { name, avatar, preferences } = await req.json();

        if (!name || typeof name !== "string") {
            return NextResponse.json({ message: "Invalid profile name" }, { status: 400 });
        }

        const user = await User.findOne({ email: currentUser.email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        if (user.profiles && user.profiles.length >= 5) {
            return NextResponse.json({ message: "Profile limit reached (max 5)" }, { status: 400 });
        }

        const profile = { name, avatar: avatar || null, preferences: preferences || [] };
        user.profiles.push(profile as any);
        await user.save();

        const newProfile = user.profiles[user.profiles.length - 1];

        return NextResponse.json({ profile: newProfile }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        await connectToDB();
        const currentUser = await serverAuth();

        const { action, profileId, name, avatar, preferences } = await req.json();

        const user = await User.findOne({ email: currentUser.email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        if (action === "setActive") {
            if (!profileId) {
                return NextResponse.json({ message: "profileId required" }, { status: 400 });
            }
            const profile = user.profiles.id(profileId);
            if (!profile) {
                return NextResponse.json({ message: "Profile not found" }, { status: 404 });
            }
            user.activeProfile = profile._id;
            await user.save();
            return NextResponse.json({ activeProfile: user.activeProfile }, { status: 200 });
        }

        // update profile
        if (!profileId) {
            return NextResponse.json({ message: "profileId required" }, { status: 400 });
        }

        const profileToUpdate = user.profiles.id(profileId);
        if (!profileToUpdate) {
            return NextResponse.json({ message: "Profile not found" }, { status: 404 });
        }

        if (name) profileToUpdate.name = name;
        if (avatar !== undefined) profileToUpdate.avatar = avatar;
        if (preferences !== undefined) profileToUpdate.preferences = preferences;

        await user.save();

        return NextResponse.json({ profile: profileToUpdate }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        await connectToDB();
        const currentUser = await serverAuth();

        const { profileId } = await req.json();
        if (!profileId) {
            return NextResponse.json({ message: "profileId required" }, { status: 400 });
        }

        const user = await User.findOne({ email: currentUser.email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const profile = user.profiles.id(profileId);
        if (!profile) {
            return NextResponse.json({ message: "Profile not found" }, { status: 404 });
        }

        // remove profile
        profile.remove();

        // if it was active, unset activeProfile
        if (user.activeProfile && user.activeProfile.toString() === profileId) {
            user.activeProfile = null as any;
        }

        await user.save();

        return NextResponse.json({ message: "Profile deleted" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
