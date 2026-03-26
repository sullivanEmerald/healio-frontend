import { Store } from "@/types/store";
import { StateCreator } from "zustand";
import { Job } from "@/types/workers";
import { fetchMarketplaceShifts, applyForShift } from "@/services/carer";
import { FilterState } from "@/app/carer/marketplace/page";
import { showToaster } from "@/lib/utils";

type CarerActions = {
    gethMarketplaceShifts: (filters: FilterState & { search: string }) => Promise<void>;
    applyForShift: (shiftId: string) => Promise<void>;
}

export type CarerSlice = {
    availableShifts: Job[] | [];
    isShiftOperation: {
        isfetching: boolean;
        isApplying: boolean;
    };
} & CarerActions;

export const createCarerSlice: StateCreator<Store, [['zustand/immer', never]], [], CarerSlice> = (set: any): CarerSlice => ({
    availableShifts: [],
    isShiftOperation: {
        isfetching: false,
        isApplying: false,
    },

    gethMarketplaceShifts: async (filters: FilterState & { search: string }) => {
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
            set((state: CarerSlice) => ({
                availableShifts: state.availableShifts.filter((shift: Job) => shift._id !== shiftId)
            }));
            showToaster("Successfully applied for the shift. Visit my shifts to view applied shifts", "success");
        } catch (error) {
            console.error("Failed to apply for shift", error);
        } finally {
            set({ isShiftOperation: { isApplying: false } });
        }
    }
});

