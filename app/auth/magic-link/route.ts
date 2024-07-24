import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("Handling POST request to /auth/magic-link");

  const { email } = await req.json();
  const cookieStore = cookies();
  console.log(email);

  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${new URL(req.url).origin}/auth/callback`,
    },
  });

  if (error) {
    console.error("Error sending magic link:", error.message);
    return NextResponse.json({ error: "Error sending magic link" }, { status: 500 });
  }

  console.log("Magic link sent:", data);

  return NextResponse.json({ message: 'Check your email for the magic link.' }, {
    status: 200,
  });
}
