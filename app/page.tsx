"use client";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleProfileClick = async () => {
    router.push("/profile");
  };

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
    <div className="grid gap-2 flex flex-col items-center justify-center mt-6">
      <div>logged in</div>
      <Button color="crimson" variant="soft" onClick={handleSignOut}>
        Sign out
      </Button>
      <Button color="grass" variant="soft" onClick={handleProfileClick}>
        Profile
      </Button>
    </div>
  );
}
