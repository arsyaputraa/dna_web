"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

import { AlignRight } from "lucide-react";
import { defaultLinks } from "@/config/nav";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { SidebarHighlighter } from "./SidebarItems";
import { Separator } from "./ui/separator";
import SidebarChild from "./SidebarChild";
import axaLogo from "public/images/axa-logo.png";
import Image from "next/image";

export default function NavbarSmall() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <div className="md:hidden border-b mb-4 pb-2 w-full">
      <nav className="flex justify-between w-full items-center">
        <div className="font-semibold text-lg">
          <Image width={50} height={50} alt="axa logo" src={axaLogo} />
        </div>
        <Button variant="ghost" onClick={() => setOpen(!open)}>
          <AlignRight />
        </Button>
      </nav>
      {open ? (
        <div className="my-4 p-4 bg-muted">
          <Accordion type="multiple">
            <ul className="space-y-2">
              {defaultLinks.map((link) => {
                if (link.children.length === 0)
                  return (
                    <li
                      key={link.title}
                      onClick={() => setOpen(false)}
                      className=""
                    >
                      <Link
                        href={link.href}
                        className={
                          pathname === link.href
                            ? "text-primary hover:text-primary font-semibold"
                            : "text-muted-foreground hover:text-primary"
                        }
                      >
                        {link.title}
                      </Link>
                    </li>
                  );
                return (
                  <li key={link.title} className="">
                    <AccordionItem value={`${link.title}-${link.href}`}>
                      <AccordionTrigger>
                        <span
                          className={
                            pathname.includes(link.href)
                              ? "text-primary hover:text-primary font-semibold"
                              : "text-muted-foreground hover:text-primary"
                          }
                        >
                          {link.title}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-row">
                        <Separator
                          orientation="vertical"
                          className="w-2 border-red-500"
                        />
                        <ul className="list-inside pl-1 space-y-1">
                          {link.children.map((child) => (
                            <li
                              key={`${child.href}-${child.title}-${child.children.length}`}
                            >
                              <Link
                                href={child.href}
                                className={
                                  pathname.includes(child.href)
                                    ? "text-primary hover:text-primary font-semibold"
                                    : "text-muted-foreground hover:text-primary"
                                }
                              >
                                {child.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </li>
                );
              })}
            </ul>
          </Accordion>
        </div>
      ) : null}
    </div>
  );
}
