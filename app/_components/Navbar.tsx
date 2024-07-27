"use client"
import React from 'react'
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Todo: Change the navbar based on if you're logged in or not

const Navbar = () => {
    const router = useRouter();

    const handleSignOut = async () => {
        console.log("Attempting to log out");
        try {
            const response = await fetch(
                `/auth/logout?timestamp=${new Date().getTime()}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Cache-Control":
                            "no-store, no-cache, must-revalidate, proxy-revalidate",
                        Pragma: "no-cache",
                        Expires: "0",
                    },
                }
            );
            if (response.ok) {
                window.location.reload();
            } else {
                console.error(
                    "Failed to log out",
                    response.status,
                    response.statusText
                );
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <header className="w-full p-4 text-black flex items-center justify-between bg-white shadow">
            <Link href="/">
            <h1 className="text-4xl font-bold">Audio Call App</h1>
            </Link>

            <div className='flex gap-2'>
                <Link href="/profile">
                    <Button color="grass" variant="soft">
                        Profile
                    </Button>
                </Link>
                <Button color="crimson" variant="soft" onClick={handleSignOut}>
                    Sign out
                </Button>
            </div>

        </header>
    )
}

export default Navbar