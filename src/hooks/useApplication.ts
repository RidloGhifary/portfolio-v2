import { appIdsEnum } from "@/constants";
import { create } from "zustand";

interface WindowSnapshot {
  x: number;
  y: number;
  width: number | string;
  height: number | string;
}

type AppWindowState = {
  status: "open" | "minimized" | "maximized" | "closed";
  prevBounds: WindowSnapshot | null;
  zIndex: number;
};

type ApplicationState = {
  windows: Record<keyof typeof appIdsEnum, AppWindowState>;
  zIndexCounter: number;
  focusWindow: (appId: keyof typeof appIdsEnum) => void;
  openWindow: (appId: keyof typeof appIdsEnum) => void;
  closeWindow: (appId: keyof typeof appIdsEnum) => void;
  minimizeWindow: (appId: keyof typeof appIdsEnum) => void;
  toggleMaximize: (
    appId: keyof typeof appIdsEnum,
    bounds: WindowSnapshot,
  ) => void;
};

export const useApplication = create<ApplicationState>((set) => ({
  zIndexCounter: 1,

  windows: {
    finder_1: { status: "open", prevBounds: null, zIndex: 1 },
    terminal_1: { status: "closed", prevBounds: null, zIndex: 0 },
  },

  // EVENTS HANDLERS
  focusWindow: (appId) =>
    set((state) => {
      const nextZ = state.zIndexCounter + 1;

      return {
        zIndexCounter: nextZ,
        windows: {
          ...state.windows,
          [appId]: {
            ...state.windows[appId],
            zIndex: nextZ,
          },
        },
      };
    }),

  openWindow: (appId) =>
    set((state) => {
      const nextZ = state.zIndexCounter + 1;

      return {
        zIndexCounter: nextZ,
        windows: {
          ...state.windows,
          [appId]: {
            ...state.windows[appId],
            status: "open",
            zIndex: nextZ,
          },
        },
      };
    }),

  closeWindow: (appId) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [appId]: { status: "closed", prevBounds: null, zIndex: 0 },
      },
    })),

  minimizeWindow: (appId) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [appId]: { ...state.windows[appId], status: "minimized" },
      },
    })),

  toggleMaximize: (appId, bounds) =>
    set((state) => {
      const win = state.windows[appId];

      if (win.status === "maximized") {
        return {
          windows: {
            ...state.windows,
            [appId]: { ...win, status: "open", prevBounds: null },
          },
        };
      }

      return {
        windows: {
          ...state.windows,
          [appId]: {
            ...win,
            status: "maximized",
            prevBounds: bounds,
          },
        },
      };
    }),
}));
