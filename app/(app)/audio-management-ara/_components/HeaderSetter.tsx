"use client";
import { useHeadStore } from "@/lib/zustand/Header";
import { useEffect } from "react";

const HeaderSetter = () => {
  const { setHeaderName } = useHeadStore();

  useEffect(() => {
    setHeaderName("Audio Management Ara");
  }, []);
  return <div className="hidden">HeaderSetter</div>;
};

export default HeaderSetter;
