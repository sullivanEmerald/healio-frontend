import { Store } from "@/types/store";
import { StateCreator } from "zustand";
import { Job } from "@/types/workers";
import { fetchMarketplaceShifts } from "@/services/carer";

type CarerActions = {
    gethMarketplaceShifts: () => Promise<void>;
}

export type CarerSlice = {
    availableShifts: Job[] | [];
    isFetching: boolean;
} & CarerActions;

export const createCarerSlice: StateCreator<Store, [['zustand/immer', never]], [], CarerSlice> = (set: any): CarerSlice => ({
    availableShifts: [],
    isFetching: false,

    gethMarketplaceShifts: async () => {
        set({ isFetching: true });
        try {
            const data = await fetchMarketplaceShifts();
            set({ availableShifts: data });
        } catch (error) {
            console.error("Failed to fetch carer data", error);
        } finally {
            set({ isFetching: false });
        }

    },
});

