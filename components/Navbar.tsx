"use client";

import { useHeadStore } from "@/lib/zustand/Header";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const Navbar = ({ name }: { name: string }) => {
  const { headername, setHeaderName } = useHeadStore();
  const pathname = usePathname();

  useMemo(() => {
    setHeaderName("");
  }, [pathname]);
  return (
    <nav className=" hidden md:flex justify-between bg-primary shadow-sm text-primary-foreground py-4 px-6">
      <div>
        <h1 className="font-semibold upper">{headername}</h1>
      </div>
      <div className={`flex items-center gap-2 `}>
        <div className={`text-primary-foreground`}>
          <p className="text-xs">{name ?? "John Doe"}</p>
        </div>
        {/* <Avatar className="h-10 w-10">
          <AvatarFallback className="border-border border-2 text-muted-foreground">
            {user.name
              ? user.name
                  ?.split(" ")
                  .map((word) => word[0].toUpperCase())
                  .join("")
              : "~"}
          </AvatarFallback>
        </Avatar> */}
      </div>
    </nav>
  );
};

export default Navbar;
