"use client";
import { useUiStore } from "@/lib/zustand/UI";
import Link from "next/link";
import { SidebarHighlighter, SidebarLink } from "./SidebarItems";

const SidebarChild = ({
  child,
  active,
}: {
  child: SidebarLink;
  active: boolean;
}) => {
  const { sidebarOpen } = useUiStore((state) => state);
  return (
    <Link
      href={child.href}
      className={`group transition-colors p-2 inline-block hover:bg-popover hover:text-primary text-muted-foreground text-xs hover:shadow rounded-md w-full${
        active ? " text-primary font-semibold" : ""
      } ${sidebarOpen ? "" : "mb-1"}`}
    >
      <div className="flex items-center">
        <SidebarHighlighter active={active} />
        <child.icon
          className={`${sidebarOpen ? "h-3.5 mr-1" : "h-1 mr-1 scale-[5]"}`}
        />
        <span className={`${sidebarOpen ? "" : "sr-only"}`}>{child.title}</span>
      </div>
    </Link>
  );
};

export default SidebarChild;
