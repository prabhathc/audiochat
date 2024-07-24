import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    console.log('YO WE ARE RUNNING DISCORD ROUTE');
    const cookieStore = cookies();

    const supabase = createRouteHandlerClient({
        cookies: () => cookieStore,
    });

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: {
            redirectTo: `${new URL(req.url).origin}/auth/callback`,
        }
    });

    if (data && data.url) {
        const response = NextResponse.redirect(data.url, {
            status: 301,
        });
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');
        return response;
    }

    if (error) {
        console.error("Error logging in:", error.message);
        const response = NextResponse.rewrite(`${new URL(req.url).origin}/login?error=invalid_credentials`, {
            status: 301,
        });
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');
        return response;
    }

    const response = NextResponse.redirect(new URL(req.url).origin, {
        status: 301,
    });
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    return response;
}
