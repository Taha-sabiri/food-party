
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
                user: body.user,
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
            user: body.user,
            date: body.date,
        })
        .eq("id", body.id)
        .select();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ message: "Food updated successfully", data });
}

export async function DELETE(req: Request) {
  const body = await req.json();

  if (!body.id)
    return NextResponse.json(
      { error: "شناسه (id) برای حذف الزامی است" },
      { status: 400 }
    );

  const { error } = await supabaseServer
    .from("food")
    .delete()
    .eq("id", body.id);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ message: "غذا با موفقیت حذف شد 🗑️" });
}