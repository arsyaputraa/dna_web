import { SidebarLink } from "@/components/SidebarItems";
import {
  ArrowBigDownDash,
  Cog,
  Gamepad,
  Globe,
  HomeIcon,
  Radiation,
} from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
  { href: "/dashboard", title: "Home", icon: HomeIcon, children: [] },
  // { href: "/account", title: "Account", icon: Cog },
  { href: "/settings", title: "Settings", icon: Cog, children: [] },
  {
    href: "/playground",
    title: "Playground",
    icon: Gamepad,
    children: [
      {
        href: "/playground/radian",
        title: "Radian",
        icon: Radiation,
        children: [],
      },
      {
        href: "/playground/arsya",
        title: "Arsya",
        icon: ArrowBigDownDash,
        children: [],
      },
    ],
  },
];

export const additionalLinks: AdditionalLinks[] = [];
