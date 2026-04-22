import { getAllShifts, getShiftById, approveApplicationAPI, verifyShift, updateShift, saveDraftRequest, getDraftRequest, getDashboardOverview } from "@/services/shift";
import { Shift } from "../types/shifts";
import { StateCreator } from "zustand";
import { Store } from "@/types/store";
import { showToaster } from "@/lib/utils";
import { DashboardOverview } from "@/types/provider";

type ShiftActions = {
    createShift: (shift: Shift) => Promise<void>;
    updateShift: (shift: Shift) => Promise<void>;
    deleteShift: (id: string) => Promise<void>;
    fetchShift: (id: string) => Promise<void | null>;
    listProviderShifts: () => Promise<void>;
    approveApplication: (applicationId: string) => Promise<void>;
    verifyShift: (id: string) => Promise<void>;
    editShift: (shift: any, id: string) => Promise<void>;
    saveDraft: (shift: any, id?: string) => Promise<void>;
    getSaveDraft: (id: string) => Promise<void>;
    getDashboardOverview: () => Promise<void>;
}

export type ShiftSlice = {
    shifts: Shift[];
    shift: Shift | null;
    applications: any[];
    assignedShifts: any[];
    savedDraft: Partial<Shift> | null;
    dashboardOverview: DashboardOverview | null;
    isLoading: {
        fetching: boolean;
        creating: boolean;
        updating: boolean;
        deleting: boolean;
        isfetchingById: boolean;
        isApproving: boolean;
        isVerifying: boolean;
        isUpdatingShift: boolean;
        isSavingDraft: boolean;
        isFetchingDraft: boolean;
        isfetchingDashboardOverview: boolean;
    }
} & ShiftActions;

export const createShiftSlice: StateCreator<Store, [['zustand/immer', never]], [], ShiftSlice> = (set: any): ShiftSlice => ({
    shifts: [],
    shift: null,
    applications: [],
    assignedShifts: [],
    savedDraft: null,
    dashboardOverview: null,
    isLoading: {
        fetching: false,
        creating: false,
        updating: false,
        deleting: false,
        isfetchingById: false,
        isApproving: false,
        isVerifying: false,
        isUpdatingShift: false,
        isSavingDraft: false,
        isFetchingDraft: false,
        isfetchingDashboardOverview: false
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

    verifyShift: async (id: string) => {
        set((state: ShiftSlice) => ({
            isLoading: { ...state.isLoading, isVerifying: true }
        }))
        try {
            await verifyShift(id);
            set((state: ShiftSlice) => ({
                assignedShifts: state.assignedShifts.map(shift => shift._id === id ? { ...shift, status: "reviewed" } : shift)
            }));
        } catch (error) {
            console.log("Error verifying shift:", error);
        } finally {
            set((state: ShiftSlice) => ({
                isLoading: { ...state.isLoading, isVerifying: false }
            }))
        }
    },

    editShift: async (shift: any, id: string) => {
        set((state: ShiftSlice) => ({
            isLoading: { ...state.isLoading, isUpdatingShift: true }
        }))
        try {
            const result = await updateShift(shift, id);
            console.log("Shift updated:", result);
            set((state: ShiftSlice) => ({
                shifts: state.shifts.map(s => s._id === shift._id ? { ...s, ...shift } : s)
            }));
        } catch (error) {
            console.log("Error updating shift:", error);
        } finally {
            set((state: ShiftSlice) => ({
                isLoading: { ...state.isLoading, isUpdatingShift: false }
            }))
        }
    },

    saveDraft: async (shift: any, id?: string | undefined) => {
        set((state: ShiftSlice) => ({
            isLoading: { ...state.isLoading, isSavingDraft: true }
        }))
        try {
            await saveDraftRequest(shift, id);
        } catch (error) {
            console.log("Error saving draft:", error);
        } finally {
            set((state: ShiftSlice) => ({
                isLoading: { ...state.isLoading, isSavingDraft: false }
            }))
        }
    },

    getSaveDraft: async (id: string) => {
        set((state: ShiftSlice) => ({
            isLoading: { ...state.isLoading, isFetchingDraft: true }
        }))
        try {
            const result = await getDraftRequest(id);
            set({ savedDraft: result });
        } catch (error) {
            console.log("Error fetching draft:", error);
        } finally {
            set((state: ShiftSlice) => ({
                isLoading: { ...state.isLoading, isFetchingDraft: false }
            }))
        }
    },

    getDashboardOverview: async () => {
        set((state: ShiftSlice) => ({
            isLoading: { ...state.isLoading, isfetchingDashboardOverview: true }
        }));

        try {
            const result = await getDashboardOverview();
            set({ dashboardOverview: result });
        } catch (error) {
            console.log("Error fetching dashboard overview:", error);
            set({ dashboardOverview: null });
        } finally {
            set((state: ShiftSlice) => ({
                isLoading: { ...state.isLoading, isfetchingDashboardOverview: false }
            }))
        }
    },

});