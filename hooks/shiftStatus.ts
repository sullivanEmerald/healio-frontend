import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import { useMemo } from "react";

export const useShiftStatus = () => {
    const { shifts, assignedShiftsAvailable } = useStore(useShallow((state) => ({
        shifts: state.shifts,
        isLoading: state.isLoading.fetching,
        isMenuBarGrid: state.isMenuBarGrid,
        assignedShiftsAvailable: state.assignedShifts,
    })));

    const publishedShifts = useMemo(() => {
        return shifts.filter(shift => shift.status === "published");
    }, [shifts]);

    const draftShifts = useMemo(() => {
        return shifts.filter(shift => shift.status === "draft");
    }, [shifts]);

    const assignedShifts = useMemo(() => {
        return assignedShiftsAvailable.filter(shift => shift.status === "assigned");
    }, [assignedShiftsAvailable]);

    const inProgressShifts = useMemo(() => {
        return assignedShiftsAvailable.filter(shift => shift.status === "in-progress");
    }, [assignedShiftsAvailable]);

    const completedShifts = useMemo(() => {
        return assignedShiftsAvailable.filter(shift => shift.status === "completed");
    }, [assignedShiftsAvailable]);

    const reviewedShifts = useMemo(() => {
        return assignedShiftsAvailable.filter(shift => shift.status === "reviewed");
    }, [assignedShiftsAvailable]);

    return { publishedShifts, draftShifts, assignedShifts, inProgressShifts, completedShifts, reviewedShifts };
}