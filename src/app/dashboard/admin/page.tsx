"use client";

import { CheckUser, Food, FoodElement, User } from "@/types/types";
import { DeleteIcon, Edit, HomeIcon, Plus, Settings, UserCircle, UserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import emoj from '@/assets/images/emoj.png'
import emoj2 from '@/assets/images/emoj2.png'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import jalaali from "jalaali-js";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
const now = new Date();


export default function Admin() {
  const [foods, setFoods] = useState<FoodElement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>()
  const { jy, jm, jd } = jalaali.toJalaali(now);
  const today = `${jy}/${jm.toString().padStart(2, "0")}/${jd.toString().padStart(2, "0")}`;
  const router = useRouter();
  console.log(today);

  const checkUser = async () => {
    const response = await fetch("/api/auth/check");
    const res: CheckUser = await response.json();
    if (res.authenticated && res.user) {
      setUser(res.user)
    } else {
      localStorage.clear()
    }

  };

  const getFood = async () => {
    const res = await fetch("/api/food");
    const data: Food = await res.json();
    setLoading(false);
    if (res.ok) setFoods(data.food);

  };

  useEffect(() => {
    getFood();
    checkUser()
  }, []);

  const faToEnNumber = (str?: string) => {
    if (!str) return "";
    const map: Record<string, string> = {
      "۰": "0",
      "۱": "1",
      "۲": "2",
      "۳": "3",
      "۴": "4",
      "۵": "5",
      "۶": "6",
      "۷": "7",
      "۸": "8",
      "۹": "9",
    };
    return str.replace(/[۰-۹]/g, (w) => map[w]);
  };

  const parseShamsiDate = (date?: string) => {
    if (!date) return 0;
    return Number(faToEnNumber(date).replace(/\//g, ""));
  };

  function diffInDays(date1?: string, date2?: string): number {
    if (!date1 || !date2) return 0;
    const [y1, m1, d1] = date1.split("/").map(Number);
    const [y2, m2, d2] = date2.split("/").map(Number);

    const g1 = jalaali.toGregorian(y1, m1, d1);
    const g2 = jalaali.toGregorian(y2, m2, d2);

    const t1 = new Date(g1.gy, g1.gm - 1, g1.gd);
    const t2 = new Date(g2.gy, g2.gm - 1, g2.gd);

    const diffTime = t1.getTime() - t2.getTime();
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
  }

  const sortedFoods = [...foods].sort(
    (a, b) => parseShamsiDate(a.date) - parseShamsiDate(b.date)
  );

  const lastFoodDate = faToEnNumber(sortedFoods[0]?.date || "");
  const todayDate = faToEnNumber(today || "");

  const diff = diffInDays(lastFoodDate, todayDate)

  return (
    <div className="bg-white max-w-2xl w-full min-h-screen p-4 relative">

      <AddFoodDialog onAdded={getFood} />

      <div className="w-full flex flex-col justify-center items-center min-h-[10svh] border-b border-black/10 mt-10 pb-4">
        <span className="text-black font-black text-2xl">فود پارتی 🍴</span>

        <span className=" text-black mt-2">به پنل ادمین خوش آمدید</span>

        {
          loading ? <Skeleton className="min-h-[10svh]  w-full p-5 rounded-2xl mt-2" /> : <div className=" w-full min-h-[10svh] mt-2 relative">

            <div className="flex justify-between w-full items-center bg-stone-600 p-4 rounded-2xl  ">
              <div className="flex flex-col">
                <span className="text-xl text-white font-bold">اطلاعات حساب:</span>
                <span className=" text-white text-xs mt-1">{user?.email}</span>
              </div>
              <UserCircle className="absolute left-10 rounded-full text-white "  size={50} />
            </div>

          </div>
        }


      </div>
      <div className="mt-4 flex flex-col gap-2 h-[85svh] overflow-y-scroll no-scrollbar">
        {loading ? (
          <span className="text-center text-black/40 mt-20">لطفا شکیبا باشید ...</span>
        ) : (
          sortedFoods.map((i) => <FoodItem key={i.id} user={i.user} date={i.date} titel={i.title} id={i.id} onChanged={getFood} hasUser={user ? true : false} />)
        )}
        <div className="min-h-[50svh] w-full"></div>
      </div>


    </div>
  );
}


function AddFoodDialog({ onAdded }: { onAdded: () => void }) {
  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false)

  const schema = z.object({
    title: z.string().min(2, "عنوان الزامی است"),
    user: z.string().min(2, "نام کاربر الزامی است"),
    date: z.string().min(4, "تاریخ الزامی است"),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { title: "", user: "", date: "" },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setLoading(true);
    const res = await fetch("/api/food", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setLoading(false);

    if (res.ok) {
      form.reset();
      onAdded();
      setIsOpen(false)
      toast.success("تبریک ! با موفقیت افزوده شد")
    } else {
      toast.error("خطا در افزودن")
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="absolute bottom-52 bg-gray-600 p-4 rounded-full text-white left-4" onClick={() => { setIsOpen(true) }}>
        <Plus />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>افزودن آیتم جدید</DialogTitle>
          <DialogDescription>لطفاً اطلاعات آیتم جدید را وارد کنید</DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 mt-4">
          <Input placeholder="عنوان غذا" {...form.register("title")} />

          <Controller
            name="user"
            control={form.control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="کاربر" />
                </SelectTrigger>
                <SelectContent dir="rtl">
                  <SelectItem value="مریم فیروزی">مریم فیروزی</SelectItem>
                  <SelectItem value="ریحانه جلالی">ریحانه جلالی</SelectItem>
                  <SelectItem value="بهناز کوهپر">بهناز کوهپر</SelectItem>
                  <SelectItem value="امین انصاری">امین انصاری</SelectItem>
                  <SelectItem value="طاها صبیری">طاها صبیری</SelectItem>
                  <SelectItem value="امیر محمد مهدی زاده">امیر محمد مهدی زاده</SelectItem>
                  <SelectItem value="ویدا رستمی">ویدا رستمی</SelectItem>
                  <SelectItem value="ماهان یدوی">ماهان یدوی</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <Input placeholder="تاریخ (مثلاً 1404/02/01)" {...form.register("date")} />

          <Button type="submit" className="mt-5" disabled={loading}>
            {loading ? "در حال افزودن..." : "افزودن"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}


interface Item {
  user: string;
  titel: string;
  id: number;
  date: string;
  hasUser: boolean
  onChanged: () => void;
}

const FoodItem = ({ user, titel, date, id, onChanged, hasUser }: Item) => {

  const deleteFood = async () => {
    const res = await fetch(`/api/food`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      toast.success("با موفقیت حذف شد");
      onChanged();
    } else toast.error("خطا در حذف آیتم");
  };
  return (
    <div className="flex border border-black/10 rounded-2xl shadow-2xl/10 p-2 gap-4">
      <div className="flex gap-4 w-full">
        <div className="bg-black/20 aspect-square rounded-2xl text-white flex justify-center items-center">
          <UserIcon className="size-10" />
        </div>
        <div className="flex flex-col py-2 h-full justify-center">
          <span className="font-bold">{titel}</span>
          <span className="text-gray-600">
            {user} - {date}
          </span>
        </div>
      </div>

      {hasUser && <div className="flex justify-center items-center gap-4 pl-4">
        <DeleteIcon className="text-red-500 cursor-pointer" onClick={deleteFood} />
      </div>}
    </div>
  );
};
