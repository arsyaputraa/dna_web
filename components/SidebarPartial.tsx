"use client";
import { AuthSession } from "@/lib/types/auth";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/lib/zustand/UI";
import Image from "next/image";
import axaLogo from "public/images/axa-logo.png";
import SidebarItems from "./SidebarItems";

const SidebarPartial = ({ session }: { session: AuthSession }) => {
  const { sidebarOpen, setSidebarClosed, setSidebarOpened } = useUiStore(
    (state) => state
  );

  // const [isConnected, setIsConnected] = useState<boolean>(false);
  // const [transport, setTransport] = useState<any>("N/A");

  // useEffect(() => {
  //   const socket = new WebSocket("ws://localhost:52000/ws");

  //   socket.addEventListener("open", () => {
  //     console.log("WebSocket connection opened");
  //     socket.send("Hello, Server!");
  //   });

  //   socket.addEventListener("message", (event) => {
  //     console.log("Received message from server:", event.data);
  //     toast.message(event.data);
  //   });

  //   socket.addEventListener("error", (error) => {
  //     console.error("WebSocket encountered an error:", error);
  //     console.log(error);
  //   });

  //   socket.addEventListener("close", (event) => {
  //     console.log("WebSocket connection closed:", event.code, event.reason);
  //   });

  //   return () => {
  //     socket.close();
  //   };
  // }, []);

  return (
    <aside
      className={`h-screen ${
        sidebarOpen ? "w-52" : "w-14"
      } bg-muted hidden md:block p-4 pt-8 border-r border-border shadow-inner transition-all ease-in-out rounded-tr-lg rounded-br-lg`}
      onMouseEnter={() => setSidebarOpened()}
      onMouseLeave={() => setSidebarClosed()}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-4">
          <div className="flex gap-2 items-center">
            <Image
              alt="axa logo"
              src={axaLogo}
              width={60}
              height={60}
              className={`text-lg font-semibold`}
            />
            <p
              className={cn(sidebarOpen ? "text-md font-semibold" : "sr-only")}
            >
              DNA SERVICES
            </p>
          </div>

          {/* <h3
              className={`${
                sidebarOpen ? "text-lg font-semibold ml-4" : "sr-only"
              }`}
            >
              Logo
            </h3> */}
          {/* <Landmark className={sidebarOpen ? "sr-only" : ""} /> */}
          <SidebarItems />
        </div>
        {/* <UserDetails session={session} /> */}
      </div>
    </aside>
  );
};

export default SidebarPartial;
