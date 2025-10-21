"use client"

import { Food, FoodElement } from "@/types/types";
import { DeleteIcon, Edit, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {

  const [foods, setFoods] = useState<FoodElement[]>([]);

  async function getFood() {
    const res = await fetch("/api/food");
    const data: Food = await res.json(); // ✅ اینجا type مشخص شد

    if (res.ok) {
      setFoods(data.food); // چون توی route گفتی return { data: ... }
    }
  }
  useEffect(() => {
    getFood()

  }, [])

  return (
    <div className="  bg-background max-w-2xl w-full min-h-screen p-4 ">
      <div className="w-full flex flex-col justify-center items-center h-[10svh] border-b border-black/10 mt-10 ">
        <span className="text-black font-black text-2xl">فود پارتی </span>
        <span className="text-gray-600 mt-2 text-center mb-5">یادآور دوستانه برای بچه‌های تیم تا هیچ کسی از لحظه‌ی شیرین امروز جا نمونه :)  </span>
      </div>


      <div className=" mt-4 flex flex-col gap-2 h-[85svh] overflow-y-scroll  no-scrollbar  ">

        {
          foods.map(i => <FoodItem key={i.id} user={i.user} date={i.date} titel={i.title} />)
        }


        <div className="min-h-[20svh] w-full"></div>

      </div>


    </div>
  );
}
interface Item {
  user: string;
  titel: string;
  date: string;
}


const FoodItem = ({ user, titel, date }: Item) => {
  return (
    <div className="flex border border-black/10 rounded-2xl shadow-2xl/10 p-2 gap-4">
      <div className="flex gap-4 w-full">
        <div className="bg-black/20 aspect-square rounded-2xl text-white flex justify-center items-center">
          <User className="size-10" />
        </div>

        <div className="flex flex-col py-2 h-full justify-center">
          <span className="font-bold">{titel}</span>
          <span className="text-gray-600">
            {user} - {date}
          </span>
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 pl-4">
        <DeleteIcon className="text-red-600 cursor-pointer" />
        <Edit className="text-orange-400 cursor-pointer" />
      </div>
    </div>
  );
};

