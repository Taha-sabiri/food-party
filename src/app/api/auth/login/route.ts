import { NextResponse } from "next/server";
import { supabaseServer } from "@/conf/server-config";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    const { email, password } = await req.json();
    const cookieStore = cookies()


    const { data, error } = await supabaseServer.auth.signInWithPassword({
        email: email,
        password: password,
    })
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 401 });
    }

    (await cookieStore).set('access_token', data.session.access_token);
    (await cookieStore).set('refresh_token', data.session.refresh_token)
    return NextResponse.json({
        message: "Login successful ✅",
        user: data.user,

    });
}
