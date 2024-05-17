import { create, createStore } from "zustand";

interface HeaderStoreProps {
  headername: string;
  setHeaderName: (headerName: string) => void;
  resetHeaderName: () => void;
}

export const useHeaderStore = createStore<HeaderStoreProps>((set) => ({
  headername: "",
  setHeaderName: (headerName: string) => {
    set((state) => ({
      ...state,
      headername: headerName,
    }));
  },
  resetHeaderName: () => {
    set((state) => ({
      headername: "",
    }));
  },
}));

export const useHeadStore = create<HeaderStoreProps>((set) => ({
  headername: "",
  setHeaderName: (headerName: string) => {
    set((state) => ({
      ...state,
      headername: headerName,
    }));
  },
  resetHeaderName: () => {
    set((state) => ({
      headername: "",
    }));
  },
}));
