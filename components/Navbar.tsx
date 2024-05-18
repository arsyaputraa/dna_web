"use client";

import { signOutAction } from "@/lib/actions/users";
import { useHeadStore } from "@/lib/zustand/Header";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Navbar = ({ name }: { name: string }) => {
  const { headername, setHeaderName } = useHeadStore();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  useMemo(() => {
    setHeaderName("");
  }, [pathname]);
  return (
    <nav className=" hidden md:flex justify-between bg-primary shadow-sm text-primary-foreground py-4 px-6">
      <div>
        <h1 className="font-semibold upper">{headername}</h1>
      </div>
      <div className={`flex items-center gap-2 `}>
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger data-state={dropdownOpen ? "open" : "closed"}>
            <div className={`text-primary-foreground flex items-center gap-1`}>
              <p className="text-xs">{name ?? "John Doe"}</p>
              <ChevronDown
                className={`h-4 w-4 ${
                  dropdownOpen ? "rotate-180" : ""
                } transition-transform`}
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent data-state={dropdownOpen ? "open" : "closed"}>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <form action={signOutAction}>
                <DropdownMenuItem>
                  <Button
                    type="submit"
                    variant={"ghost"}
                    size={"sm"}
                    className="h-fit w-fit p-0"
                  >
                    Log out
                  </Button>
                </DropdownMenuItem>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
