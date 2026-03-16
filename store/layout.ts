import { StateCreator } from "zustand/vanilla";
import { Store } from "@/types/store";

type LayoutActions = {
    toggleMenuBar: (layout: string) => void;
}

export type LayoutSlice = {
    isMenuBarGrid: string;
} & LayoutActions;

export const createLayoutSlice: StateCreator<Store, [['zustand/immer', never]], [], LayoutSlice> = (set: any): LayoutSlice => ({
    isMenuBarGrid: "grid",
    toggleMenuBar: (layout: string) => set((state: LayoutSlice) => ({ isMenuBarGrid: layout })),
});