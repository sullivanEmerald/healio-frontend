import { getAllShifts, getShiftById } from "@/services/shift";
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
    shift: Shift | null;
    isLoading: {
        fetching: boolean;
        creating: boolean;
        updating: boolean;
        deleting: boolean;
    }
} & ShiftActions;

export const createShiftSlice: StateCreator<Store, [['zustand/immer', never]], [], ShiftSlice> = (set: any): ShiftSlice => ({
    shifts: [],
    shift: null,
    isLoading: {
        fetching: false,
        creating: false,
        updating: false,
        deleting: false,
    },

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
        try {
            const shift = await getShiftById(id as string);
            set({ shift });
        } catch (error) {
            console.log("Error fetching shift:", error);
            set({ shift: null });
        } finally {
            set({ isLoading: false });
        }
    },
    listProviderShifts: async () => {
        set((state: ShiftSlice) => ({
            isLoading: { ...state.isLoading, fetching: true }
        }))
        try {
            const shifts = await getAllShifts();
            set({ shifts });
        } catch (error) {
            // Optionally set an error state here
        } finally {
            set((state: ShiftSlice) => ({
                isLoading: { ...state.isLoading, fetching: false }
            }))
        }
    },

});