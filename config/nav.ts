import { SidebarLink } from "@/components/SidebarItems";
import {
  ArrowBigDownDash,
  AudioLinesIcon,
  BookAudio,
  Cog,
  FileAudio,
  Gamepad,
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
    href: "/audio",
    title: "Audio",
    icon: AudioLinesIcon,
    children: [
      {
        href: "/audio-management",
        title: "Audio Management",
        icon: BookAudio,
        children: [],
      },
      {
        href: "/audio-management-ara",
        title: "Audio Management Ara",
        icon: FileAudio,
        children: [],
      },
    ],
  },
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
