import { getAllShifts } from "@/services/shift";
import { Shift } from "../types/shifts";
import { StateCreator } from "zustand";
import { Store } from "@/types/store";

type ShiftActions = {
    createShift: (shift: Shift) => Promise<void>;
    updateShift: (shift: Shift) => Promise<void>;
    deleteShift: (id: string) => Promise<void>;
    fetchShift: (id: string) => Promise<void | null>;
    listProviderShifts: () => Promise<void>;
}

export type ShiftSlice = {
    shifts: Shift[];
    isLoading: boolean;
} & ShiftActions;

export const createShiftSlice: StateCreator<Store, [['zustand/immer', never]], [], ShiftSlice> = (set: any): ShiftSlice => ({
    shifts: [],
    isLoading: false,

    createShift: async (shift: Shift) => {
        // Implementation for creating a shift
    },
    updateShift: async (shift: Shift) => {
        // Implementation for updating a shift
    },
    deleteShift: async (id: string) => {
        // Implementation for deleting a shift
    },
    fetchShift: async (id: string) => {
        // Implementation for fetching a single shift
        return null;
    },
    listProviderShifts: async () => {
        set({ isLoading: true });
        try {
            const shifts = await getAllShifts();
            set({ shifts });
        } catch (error) {
            // Optionally set an error state here
        } finally {
            set({ isLoading: false });
        }
    },

});