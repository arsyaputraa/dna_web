"use client";
import Link from "next/link";
import { defaultLinks } from "@/config/nav";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { SidebarLink } from "./SidebarItems";
import { Fragment } from "react";
import { LinkIcon } from "lucide-react";

export function Breadcrumbs() {
  const pathname = usePathname();
  function getBreadcrumbsItem() {
    let items: { href: string; title: string }[] = [];
    const pathArray = pathname.split("/").slice(1);

    pathArray.reduce((prevPath, currPath) => {
      let currentFullPath = `${prevPath}/${currPath}`;
      const newItem = {
        href: currentFullPath,

        title: currPath,
      };
      items.push(newItem);
      return currentFullPath;
    }, "");

    return items;
  }

  const breadcrumbsItems = getBreadcrumbsItem();

  return (
    <div className="hidden p-4 md:flex justify-between  bg-muted">
      <p className="font-semibold capitalize">
        {breadcrumbsItems[breadcrumbsItems.length - 1].title.toLowerCase()}
      </p>
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbsItems.map((item, idx) => {
            return (
              <Fragment key={item.title + idx}>
                {idx !== 0 && <BreadcrumbSeparator />}

                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.title}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
