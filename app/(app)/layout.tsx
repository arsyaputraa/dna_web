import NavbarSmall from "@/components/NavbarSmall";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/ui/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { checkAuth } from "@/lib/auth/utils";
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth();
  return (
    <main>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1  overflow-y-auto">
          <NavbarSmall />
          <Navbar />
          <div className="md:p-8 pt-2 p-8">{children}</div>
        </main>
      </div>
      <Toaster richColors />
    </main>
  );
}
