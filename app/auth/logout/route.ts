import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const cookieStore = cookies();

    const supabase = createRouteHandlerClient({
        cookies: () => cookieStore,
    });

    try {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error during sign out:", error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        console.log("Successfully logged out, redirecting...");
        return NextResponse.redirect(url.origin, {
            status: 301,
        });
    } catch (err) {
        console.error("Unexpected error during logout:", err);
        return NextResponse.json({ error: "Unexpected error during logout" }, { status: 500 });
    }
}
