import { StateCreator } from "zustand/vanilla";
import { Store } from "@/types/store";
import { Provider } from "@/types/users";
import { getProviderDetails } from "@/services/shift";


type UserActions = {
    getProviderDetails: () => Promise<void>;
}

export type UserSlice = {
    provider: Provider | null;
    loading: {
        isFetchingProviderDetails: boolean;
    }
} & UserActions;

export const createUserSlice: StateCreator<Store, [['zustand/immer', never]], [], UserSlice> = (set: any): UserSlice => ({
    provider: null,
    loading: {
        isFetchingProviderDetails: false,
    },
    getProviderDetails: async () => {
        set((state: UserSlice) => ({
            loading: {
                ...state.loading,
                isFetchingProviderDetails: true,
            }
        }));
        try {
            const result = await getProviderDetails();
            set({ provider: result });
        } catch (error) {
            console.error("Error fetching provider details:", error);
        } finally {
            set((state: UserSlice) => ({
                loading: {
                    ...state.loading,
                    isFetchingProviderDetails: false,
                }
            }));
        }
    },
});
