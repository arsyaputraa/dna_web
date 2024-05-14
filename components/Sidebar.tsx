import Link from "next/link";

import { Avatar, AvatarFallback } from "./ui/avatar";

import { getUserAuth } from "@/lib/auth/utils";
import { AuthSession } from "@/lib/types/auth";
import SidebarPartial from "./SidebarPartial";

const Sidebar = async () => {
  const session = await getUserAuth();
  if (session.session === null) return null;

  return <SidebarPartial session={session} />;
};

export default Sidebar;
