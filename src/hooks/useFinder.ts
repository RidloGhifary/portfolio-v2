import { create } from "zustand";

type VFile = {
  id: string;
  name: string;
  type: "folder" | "image" | "video" | "text";
  children?: VFile[];
  src?: string;
};
