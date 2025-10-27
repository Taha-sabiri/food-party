import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseServer } from "@/conf/server-config";

export async function GET() {
  const cookieStore = cookies();
  const access_token = (await cookieStore).get("access_token")?.value;

  if (!access_token) {
    return NextResponse.json(
      { authenticated: false, message: "No access token found" },
      { status: 401 }
    );
  }

  const {
    data: { user },
    error,
  } = await supabaseServer.auth.getUser(access_token);

  if (error || !user) {
    (await cookieStore).delete('access_token');
    (await cookieStore).delete('refresh_token')
    return NextResponse.json(
      { authenticated: false, message: "Invalid or expired token" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    authenticated: true,
    user,
  });
}
