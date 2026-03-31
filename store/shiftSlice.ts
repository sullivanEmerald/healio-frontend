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
    applications: any[]; // You can replace 'any' with a specific type if you have one for applications
    isLoading: {
        fetching: boolean;
        creating: boolean;
        updating: boolean;
        deleting: boolean;
        isfetchingById: boolean;
    }
} & ShiftActions;

export const createShiftSlice: StateCreator<Store, [['zustand/immer', never]], [], ShiftSlice> = (set: any): ShiftSlice => ({
    shifts: [],
    shift: null,
    applications: [],
    isLoading: {
        fetching: false,
        creating: false,
        updating: false,
        deleting: false,
        isfetchingById: false
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
        set((state: ShiftSlice) => ({
            isLoading: { ...state.isLoading, isfetchingById: true }
        }))
        try {
            const result = await getShiftById(id as string);
            set({ shift: result?.shift, applications: result?.application || [] });
        } catch (error) {
            console.log("Error fetching shift:", error);
            set({ shift: null });
        } finally {
            set((state: ShiftSlice) => ({
                isLoading: { ...state.isLoading, isfetchingById: false }
            }))
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