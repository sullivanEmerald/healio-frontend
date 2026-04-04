import { Store } from "@/types/store";
import { StateCreator } from "zustand";
import { Job } from "@/types/workers";
import { fetchMarketplaceShifts, applyForShift, fetchMyShifts, startShiftNow } from "@/services/carer";
import { FilterState } from "@/app/carer/marketplace/page";
import { showToaster } from "@/lib/utils";

type CarerActions = {
    getMarketplaceShifts: (filters: FilterState & { search: string }) => Promise<void>;
    applyForShift: (shiftId: string) => Promise<void>;
    getMyShifts: () => Promise<void>;
    startShift: (shiftId: string) => Promise<void>;
}

export type CarerSlice = {
    availableShifts: Job[] | [];
    myAppliedShifts: any[] | [];
    isShiftOperation: {
        isfetching: boolean;
        isApplying: boolean;
        isMyShiftsLoading: boolean;
        isStartingShift: boolean;
    };
} & CarerActions;

export const createCarerSlice: StateCreator<Store, [['zustand/immer', never]], [], CarerSlice> = (set: any): CarerSlice => ({
    availableShifts: [],
    myAppliedShifts: [],
    isShiftOperation: {
        isfetching: false,
        isApplying: false,
        isMyShiftsLoading: false,
        isStartingShift: false,
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
            set({ myShifts: data });
        } catch (error) {
            console.error("Failed to fetch my shifts", error);
        } finally {
            set({ isShiftOperation: { isMyShiftsLoading: false } });
        }
    },

    startShift: async (shiftId: string) => {
        set({ isShiftOperation: { isStartingShift: true } });
        try {
            const data = await startShiftNow(shiftId);
            setTimeout(() => {
                set((state: CarerSlice) => ({
                    myShifts: state.myShifts.map((shift: any) =>
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
});
