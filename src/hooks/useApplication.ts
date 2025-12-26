import { appIdsEnum, WindowState } from "@/constants";
import { create } from "zustand";

interface WindowSnapshot {
  x: number;
  y: number;
  width: number | string;
  height: number | string;
}

interface ApplicationState {
  applicationId: keyof typeof appIdsEnum;
  windowStatus: WindowState;
  prevBounds: WindowSnapshot | null;
  closeWindow: (appId: keyof typeof appIdsEnum) => void;
  minimizeWindow: (appId: keyof typeof appIdsEnum) => void;
  maximizeWindow: (appId: keyof typeof appIdsEnum) => void;
  openWindow: (appId: keyof typeof appIdsEnum) => void;
  toggleMaximize: (appId: string, bounds: WindowSnapshot) => void;
}

export const useApplication = create<ApplicationState>((set) => ({
  applicationId: "terminal_1",
  windowStatus: "open",
  prevBounds: null,

  // EVENTS HANDLERS
  closeWindow: (appId) => {
    set({ windowStatus: "closed", applicationId: appId });
  },
  minimizeWindow: (appId) => {
    set({ windowStatus: "minimized", applicationId: appId });
  },
  maximizeWindow: (appId) => {
    set({ windowStatus: "maximized", applicationId: appId });
  },
  openWindow: (appId) => {
    set({ windowStatus: "open", applicationId: appId });
  },
  toggleMaximize: (appId, bounds) =>
    set((state) => {
      if (state.windowStatus === "maximized") {
        // restore
        return {
          windowStatus: "open",
          applicationId: state.applicationId as "finder_1" | "terminal_1",
          prevBounds: null,
        };
      }

      // maximize
      return {
        windowStatus: "maximized",
        applicationId: appId as "finder_1" | "terminal_1",
        prevBounds: bounds,
      };
    }),
}));
