
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    const cookieStore = cookies();

    (await cookieStore).delete("access_token");
    (await cookieStore).delete("refresh_token");

    return NextResponse.json({ message: " OK ✅" });
}