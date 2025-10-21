import { Delete, DeleteIcon, Edit, User } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="  bg-background max-w-2xl w-full min-h-screen p-4 ">
      <div className="w-full flex flex-col justify-center items-center h-[10svh] border-b border-black/10 mt-10 ">
        <span className="text-black font-black text-2xl">فود پارتی </span>
        <span className="text-gray-600 mt-2 text-center mb-5">یادآور دوستانه برای بچه‌های تیم تا هیچ کسی از لحظه‌ی شیرین امروز جا نمونه :)  </span>
      </div>


      <div className=" mt-4 flex flex-col gap-2 h-[85svh] overflow-y-scroll  no-scrollbar  ">

        <FoodItem />
        <FoodItem />
        <FoodItem />
        <FoodItem />
        <FoodItem />
        <FoodItem />
        <FoodItem />
        <FoodItem />
        <FoodItem />
        <FoodItem />
        <FoodItem />
        <FoodItem />
        <div className="min-h-[20svh] w-full"></div>

      </div>


    </div>
  );
}
const FoodItem = () => {
  return <div className="flex border border-black/10  rounded-2xl shadow-2xl/10 p-2 gap-4 ">
    <div className="flex gap-4 w-full ">
      <div className="bg-black/20   aspect-square rounded-2xl text-white flex justify-center items-center  ">
        <User className="size-10" />
      </div>
      <div className="flex flex-col  py-2 h-full justify-center">
        <span className=" font-bold ">املت با نوشابه</span>
        <span className="text-gray-600">مریم فیروزی - 1404/02/01</span>
      </div>
    </div>

    <div className=" flex justify-center items-center gap-4 pl-4">
      <DeleteIcon className="text-red-600" />
      <Edit className="text-orange-400" />
    </div>


  </div>;
}

