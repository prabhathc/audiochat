import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("yo watsup im in the auth/Login route");

  const url = new URL(req.url);
  const cookieStore = cookies();

  const formData = await req.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  console.log(email, password);

  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Error logging in:", error.message);
    return NextResponse.redirect(`${url.origin}/login?error=invalid_credentials`, {
      status: 301,
    });
  }

  console.log(data);

  return NextResponse.redirect(url.origin, {
    status: 301,
  });
}
