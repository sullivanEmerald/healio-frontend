import { getAllShifts, getShiftById, approveApplicationAPI } from "@/services/shift";
import { Shift } from "../types/shifts";
import { StateCreator } from "zustand";
import { Store } from "@/types/store";
import { showToaster } from "@/lib/utils";

type ShiftActions = {
    createShift: (shift: Shift) => Promise<void>;
    updateShift: (shift: Shift) => Promise<void>;
    deleteShift: (id: string) => Promise<void>;
    fetchShift: (id: string) => Promise<void | null>;
    listProviderShifts: () => Promise<void>;
    approveApplication: (applicationId: string) => Promise<void>;
}

export type ShiftSlice = {
    shifts: Shift[];
    shift: Shift | null;
    applications: any[];
    assignedShifts: any[]; // You can replace 'any' with a specific type if you have one for assigned shifts
    isLoading: {
        fetching: boolean;
        creating: boolean;
        updating: boolean;
        deleting: boolean;
        isfetchingById: boolean;
        isApproving: boolean;
    }
} & ShiftActions;

export const createShiftSlice: StateCreator<Store, [['zustand/immer', never]], [], ShiftSlice> = (set: any): ShiftSlice => ({
    shifts: [],
    shift: null,
    applications: [],
    assignedShifts: [],
    isLoading: {
        fetching: false,
        creating: false,
        updating: false,
        deleting: false,
        isfetchingById: false,
        isApproving: false,
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
            console.log("Fetched shift details:", result.shift);
            set({ shift: result?.shift, applications: result?.applications || [] });
        } catch (error) {
            console.log("Error fetching shift:", error);
            set({ shift: null });
        } finally {
            set((state: ShiftSlice) => ({
                isLoading: { ...state.isLoading, isfetchingById: false }
            }))
        }
    },
    approveApplication: async (id: string) => {
        set((state: ShiftSlice) => ({
            isLoading: { ...state.isLoading, isApproving: true }
        }))
        try {
            // Call the API to approve the application
            const result = await approveApplicationAPI(id);
            console.log("Application approved:", result);
            setTimeout(() => {
                set((state: ShiftSlice) => ({
                    applications: state.applications.map(app => app._id === id ? { ...app, status: "approved" } : { ...app, status: 'rejected' }) // Optionally remove the approved application from the list
                }));
            }, 1000);
            showToaster("Application approved successfully!");
        } catch (error) {
            console.log("Error approving application:", error);
            set({ shift: null });
        } finally {
            set((state: ShiftSlice) => ({
                isLoading: { ...state.isLoading, isApproving: false }
            }))
        }
    },
    listProviderShifts: async () => {
        set((state: ShiftSlice) => ({
            isLoading: { ...state.isLoading, fetching: true }
        }))
        try {
            const result = await getAllShifts();
            set({ shifts: result?.shifts, assignedShifts: result?.assignments });
        } catch (error) {
            console.log("Error fetching shifts:", error);
            set({ shifts: [], assignedShifts: [] });
        } finally {
            set((state: ShiftSlice) => ({
                isLoading: { ...state.isLoading, fetching: false }
            }))
        }
    },

});