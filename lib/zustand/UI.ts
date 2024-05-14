import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UI {
  sidebarOpen: boolean;
  setSidebarOpen: () => void;
  setSidebarOpened: () => void;
  setSidebarClosed: () => void;
}

export const useUiStore = create<UI>()(
  persist(
    (set, get) => ({
      sidebarOpen: true,
      setSidebarOpen: () => {
        set((state) => ({
          ...state,
          sidebarOpen: !state.sidebarOpen,
        }));
      },
      setSidebarOpened: () => {
        set((state) => ({
          ...state,
          sidebarOpen: true,
        }));
      },
      setSidebarClosed: () => {
        set((state) => ({
          ...state,
          sidebarOpen: false,
        }));
      },
    }),
    {
      name: "ui-storage",
    }
  )
);
