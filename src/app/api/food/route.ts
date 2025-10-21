
import { supabaseServer } from '@/conf/server-config';
import { NextResponse } from 'next/server';



export async function GET() {
    const { data: food, error } = await supabaseServer
        .from("food")
        .select("*");

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ food });
}


export async function POST(request: Request) {
    const body = await request.json();

    const { data, error } = await supabaseServer
        .from("food")
        .insert([
            {
                title: body.title,
                calories: body.calories,
                date: body.date,
            },
        ])
        .select();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ message: "تبریک ! با موفقیت اضافه شد", data });
}



export async function PATCH(request: Request) {
    const body = await request.json();

    const { data, error } = await supabaseServer
        .from("food")
        .update({
            title: body.title,
            calories: body.calories,
            date: body.date,
        })
        .eq("id", body.id)
        .select();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ message: "Food updated successfully", data });
}