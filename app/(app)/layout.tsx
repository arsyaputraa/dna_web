import Navbar from "@/components/Navbar";
import NavbarSmall from "@/components/NavbarSmall";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import { checkAuth, getUserAuth } from "@/lib/auth/utils";
import { memo } from "react";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth();
  const currentUser = await getUserAuth();
  const NavbarMemoized = memo(Navbar);
  const NavbarSmallMemoized = memo(NavbarSmall);
  return (
    <main>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1  overflow-y-auto">
          <div className="sticky top-0 z-50">
            <NavbarSmallMemoized />
            <NavbarMemoized name={currentUser.session?.user.name || ""} />
            {/* <Breadcrumbs /> */}
          </div>

          <div className="md:p-8 pt-2 p-8">{children}</div>
        </main>
      </div>
      <Toaster richColors />
    </main>
  );
}
