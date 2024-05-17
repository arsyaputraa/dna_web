import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getUserAuth } from "@/lib/auth/utils";
import { CheckIcon, Clock, StopCircle, XIcon } from "lucide-react";

export default async function Home() {
  const { session } = await getUserAuth();
  return (
    <main className="max-w-7xl flex justify-center md:justify-start flex-wrap gap-4">
      <Card className="md:h-[150px] w-full md:w-[300px]  flex p-3 gap-2">
        <div className="flex justify-center items-center rounded-md shadow-md bg-green-500 w-1/3 text-white">
          <CheckIcon />
        </div>
        <div className="flex-1 text-lg place-self-center">
          <p className=" md:text-xl">Total Success</p>
          <p className="font-bold text-2xl">0</p>
        </div>
      </Card>
      <Card className="md:h-[150px] w-full md:w-[300px] flex p-3 gap-2">
        <div className="flex justify-center items-center rounded-md shadow-md bg-orange-500 w-1/3 text-white">
          <Clock />
        </div>
        <div className="flex-1 text-lg place-self-center">
          <p className=" md:text-xl">Total Pending</p>
          <p className="font-bold text-2xl">0</p>
        </div>
      </Card>
      <Card className="md:h-[150px] w-full md:w-[300px] flex p-3 gap-2">
        <div className="flex justify-center items-center rounded-md shadow-md bg-red-500 w-1/3 text-white">
          <XIcon />
        </div>
        <div className="flex-1 text-lg place-self-center">
          <p className=" md:text-xl">Total Failed</p>
          <p className="font-bold text-2xl">0</p>
        </div>
      </Card>
      <Card className="md:h-[150px] w-full md:w-[300px] flex p-3 gap-2">
        <div className="flex justify-center items-center rounded-md shadow-md bg-red-600 w-1/3 text-white">
          <StopCircle />
        </div>
        <div className="flex-1 text-lg place-self-center">
          <p className=" md:text-xl">Total Stop</p>
          <p className="font-bold text-2xl">0</p>
        </div>
      </Card>
      <div className="w-full ">
        <Card className="w-full md:w-[500px] min-h-[300px]">
          <CardHeader className="flex flex-row gap-2">
            <div className="flex flex-col gap-2">
              <CardTitle>Bar Chart</CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Voluptatum cum facilis fugit ex numquam sit.
              </CardDescription>
            </div>
            <Select>
              <SelectTrigger className="">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </main>
  );
}
