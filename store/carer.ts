import { Store } from "@/types/store";
import { StateCreator } from "zustand";
import { Job } from "@/types/workers";
import { fetchMarketplaceShifts, applyForShift, fetchMyShifts, startShiftNow, markShiftAsCompleted } from "@/services/carer";
import { FilterState } from "@/app/carer/marketplace/page";
import { showToaster } from "@/lib/utils";

type CarerActions = {
    getMarketplaceShifts: (filters: FilterState & { search: string }) => Promise<void>;
    applyForShift: (shiftId: string) => Promise<void>;
    getMyShifts: () => Promise<void>;
    startShift: (shiftId: string) => Promise<void>;
    markShiftCompleted: (shiftId: string) => Promise<void>;
}

export type CarerSlice = {
    availableShifts: any[] | [];
    myAppliedShifts: any[] | [];
    myAssignedShifts: any[] | [];
    isShiftOperation: {
        isfetching: boolean;
        isApplying: boolean;
        isMyShiftsLoading: boolean;
        isStartingShift: boolean;
        isCompletingShift: boolean;
    };
} & CarerActions;

export const createCarerSlice: StateCreator<Store, [['zustand/immer', never]], [], CarerSlice> = (set: any): CarerSlice => ({
    availableShifts: [],
    myAppliedShifts: [],
    myAssignedShifts: [],
    isShiftOperation: {
        isfetching: false,
        isApplying: false,
        isMyShiftsLoading: false,
        isStartingShift: false,
        isCompletingShift: false,
    },

    getMarketplaceShifts: async (filters: FilterState & { search: string }) => {
        set({ isShiftOperation: { isfetching: true } });
        try {
            const data = await fetchMarketplaceShifts(filters);
            set({ availableShifts: data });
        } catch (error) {
            console.error("Failed to fetch carer data", error);
        } finally {
            set({ isShiftOperation: { isfetching: false } });
        }

    },

    applyForShift: async (shiftId: string) => {
        set({ isShiftOperation: { isApplying: true } });
        try {
            await applyForShift(shiftId);
            setTimeout(() => {
                set((state: CarerSlice) => ({
                    availableShifts: state.availableShifts.filter((shift: Job) => shift._id !== shiftId)
                }));
                showToaster("Successfully applied for the shift. Visit my shifts to view applied shifts", "success");
            }, 2000);
        } catch (error) {
            console.error("Failed to apply for shift", error);
        } finally {
            set({ isShiftOperation: { isApplying: false } });
        }
    },

    getMyShifts: async () => {
        set({ isShiftOperation: { isMyShiftsLoading: true } });
        try {
            const data = await fetchMyShifts();
            console.log("Fetched my shifts", data);
            set({ myAssignedShifts: data.assignedShifts, myAppliedShifts: data.appliedShifts });
        } catch (error) {
            console.error("Failed to fetch my shifts", error);
        } finally {
            set({ isShiftOperation: { isMyShiftsLoading: false } });
        }
    },

    startShift: async (shiftId: string) => {
        set({ isShiftOperation: { isStartingShift: true } });
        try {
            await startShiftNow(shiftId);
            setTimeout(() => {
                set((state: CarerSlice) => ({
                    myAssignedShifts: state.myAssignedShifts.map((shift: any) =>
                        shift._id === shiftId ? { ...shift, status: "in-progress" } : shift
                    )
                }));
                showToaster("Successfully started the shift", "success");
            }, 2000);
        } catch (error) {
            console.error("Failed to start shift", error);
        } finally {
            set({ isShiftOperation: { isStartingShift: false } });
        }
    },

    markShiftCompleted: async (shiftId: string) => {
        set({ isShiftOperation: { isCompletingShift: true } });
        try {
            await markShiftAsCompleted(shiftId);
            setTimeout(() => {
                set((state: CarerSlice) => ({
                    myAssignedShifts: state.myAssignedShifts.map((shift: any) =>
                        shift._id === shiftId ? { ...shift, status: "completed" } : shift
                    )
                }));
                showToaster("Successfully marked the shift as completed", "success");
            }, 2000);
        } catch (error) {
            console.error("Failed to mark shift as completed", error);
        } finally {
            set({ isShiftOperation: { isCompletingShift: false } });
        }
    },
});
