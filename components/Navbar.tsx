import { getUserAuth } from "@/lib/auth/utils";
import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";

const Navbar = async () => {
  const session = await getUserAuth();
  if (session.session === null) return null;

  const user = session.session.user;

  return (
    <nav className=" hidden md:flex justify-end bg-primary shadow-sm text-primary-foreground py-4 px-6">
      <div className={`flex items-center gap-2 `}>
        <div className={`text-primary-foreground`}>
          <p className="text-xs">{user.name ?? "John Doe"}</p>
        </div>
        <Avatar className="h-10 w-10">
          <AvatarFallback className="border-border border-2 text-muted-foreground">
            {user.name
              ? user.name
                  ?.split(" ")
                  .map((word) => word[0].toUpperCase())
                  .join("")
              : "~"}
          </AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default Navbar;
