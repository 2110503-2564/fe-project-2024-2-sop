"use client"; 

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import getUserProfile from "@/libs/getUserProfile";
import { LinearProgress } from "@mui/material";
import UserCard from "@/components/UserCard";

export default function Profile() {
    const { data: session } = useSession();
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!session?.user?.token) return;

        console.log("Fetching user profile...");
        getUserProfile(session.user.token)
            .then((data) => {
                console.log("User Profile:", data);
                setUser(data);
            })
            .catch((error) => {
                console.error("Error fetching user profile:", error);
            });
    }, [session?.user?.token]);

    if (!session?.user?.token) {
        return <p>Unauthorized</p>;
    }

    if (!user) {
        return <p>Loading...<LinearProgress/></p>;
    }

    return <UserCard UserProfile={user} />;
}
