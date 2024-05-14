"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LucideIcon } from "lucide-react";

import { additionalLinks, defaultLinks } from "@/config/nav";
import { AuthSession } from "@/lib/types/auth";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/lib/zustand/UI";
import { useMemo, useState } from "react";
import SidebarChild from "./SidebarChild";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";

export interface SidebarLink {
  title: string;
  href: string;
  icon: LucideIcon;
  children: SidebarLink[];
}

const SidebarItems = () => {
  const { sidebarOpen } = useUiStore((state) => state);
  const [accordionValue, setAccordionValue] = useState<string>("");

  useMemo(() => {
    setAccordionValue("");
  }, [sidebarOpen]);
  return (
    <Accordion
      type="single"
      collapsible
      value={accordionValue}
      onValueChange={(v) => setAccordionValue(v)}
    >
      <SidebarLinkGroup links={defaultLinks} />
      {additionalLinks.length > 0
        ? additionalLinks.map((l) => (
            <SidebarLinkGroup
              links={l.links}
              title={l.title}
              border
              key={l.title}
            />
          ))
        : null}
    </Accordion>
  );
};
export default SidebarItems;

const SidebarLinkGroup = ({
  links,
  title,
  border,
}: {
  links: SidebarLink[];
  title?: string;
  border?: boolean;
}) => {
  const { sidebarOpen } = useUiStore((state) => state);
  const fullPathname = usePathname();
  const pathname = "/" + fullPathname.split("/")[1];

  return (
    <div className={border ? "border-border border-t my-8 pt-4" : ""}>
      {title ? (
        <h4 className="px-2 mb-2 text-xs uppercase text-muted-foreground tracking-wider">
          {title}
        </h4>
      ) : null}
      <ul>
        {links.map((link) => (
          <li key={link.title}>
            <SidebarLink link={link} active={pathname === link.href} />
          </li>
        ))}
      </ul>
    </div>
  );
};
const SidebarLink = ({
  link,
  active,
}: {
  link: SidebarLink;
  active: boolean;
}) => {
  const { sidebarOpen } = useUiStore((state) => state);
  const pathname = usePathname();
  if (link.children.length === 0) {
    return (
      <Link
        href={link.href}
        className={`group transition-colors p-2 inline-block hover:bg-popover hover:text-primary text-muted-foreground text-xs hover:shadow rounded-md w-full${
          active ? " text-primary font-semibold" : ""
        } ${sidebarOpen ? "" : "mb-1"}`}
      >
        <div className="flex items-center">
          <div
            className={cn(
              "opacity-0 left-0 h-6 w-[4px] absolute rounded-r-lg bg-primary",
              active ? "opacity-100" : ""
            )}
          />
          <link.icon
            className={`${sidebarOpen ? "h-3.5 mr-1" : "h-1 mr-1 scale-[5]"}`}
          />
          <span className={`${sidebarOpen ? "" : "sr-only"}`}>
            {link.title}
          </span>
        </div>
      </Link>
    );
  }

  return (
    <AccordionItem value={`${link.title}-${link.href}`} className="border-none">
      <AccordionTrigger
        showIcon={sidebarOpen ? true : false}
        className={`group transition-colors w-fit h-fit p-2 flex hover:bg-popover hover:no-underline hover:text-primary text-muted-foreground text-xs hover:shadow rounded-md w-full${
          active ? " text-primary font-semibold" : ""
        } ${sidebarOpen ? "mr-1" : "mb-1 block mt-1"}`}
      >
        <div>
          <div className="flex items-center">
            <SidebarHighlighter active={active} />
            <link.icon
              className={`${sidebarOpen ? "h-3.5 mr-1" : "h-1 mr-1 scale-[5]"}`}
            />
            <span className={`${sidebarOpen ? "" : "sr-only"}`}>
              {link.title}
            </span>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="flex flex-row">
        <Separator orientation="vertical" className="w-2 border-red-500" />
        <ul className="list-inside pl-1">
          {link.children.map((child) => (
            <li key={`${child.href}-${child.title}-${child.children.length}`}>
              <SidebarChild
                child={child}
                active={pathname.includes(child.href)}
              />
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
};

export const UserDetails = ({ session }: { session: AuthSession }) => {
  const { sidebarOpen } = useUiStore((state) => state);
  if (session.session === null) return null;
  const { user } = session.session;

  if (!user?.name || user.name.length == 0) return null;

  return (
    <Link href="/account">
      <div
        className={`flex items-center ${
          sidebarOpen ? "justify-between" : "justify-center"
        } w-full border-t border-border pt-4 px-2`}
      >
        <div
          className={`text-muted-foreground ${sidebarOpen ? "" : "sr-only"}`}
        >
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
    </Link>
  );
};

export const SidebarHighlighter = ({ active }: { active: boolean }) => {
  return (
    <div
      className={cn(
        "opacity-0 left-0 h-6 w-[4px] absolute rounded-r-lg bg-primary",
        active ? "opacity-100" : ""
      )}
    />
  );
};
