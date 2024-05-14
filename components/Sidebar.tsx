import { getUserAuth } from "@/lib/auth/utils";
import SidebarPartial from "./SidebarPartial";

const Sidebar = async () => {
  const session = await getUserAuth();
  if (session.session === null) return null;

  return <SidebarPartial session={session} />;
};

export default Sidebar;
