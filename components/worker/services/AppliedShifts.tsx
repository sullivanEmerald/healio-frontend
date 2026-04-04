import { ToggleLayout } from "@/components/common/toggleLayout";
import { useStore } from "@/store/store";
import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import GridLayout from "@/components/common/gridLayout";
import CardLayout from "@/components/common/cardLayout";
import { NotFoundComponent } from "@/components/common/NotFoundComponent";
import { ShiftRecordCard } from "../components/ShiftRecord";
import { CarerShiftApplication } from "@/types/workers";

export default function AppliedShifts() {
    const { myShifts } = useStore(useShallow((state) => ({
        myShifts: state.myShifts,
    })));

    const appliedShifts = useMemo(() => {
        return myShifts.filter(shift => shift.status === "pending");
    }, [myShifts]);

    return (
        <div className="mb-4 space-y-4">
            <div className="flex align-items-center justify-between">
                <h2 className="text-lg font-semibold">Applied Shifts</h2>
                <ToggleLayout />
            </div>
            {appliedShifts.length === 0 ? (
                <NotFoundComponent title="No applied shifts found." />
            ) : (
                <GridLayout>
                    {appliedShifts.map((shift: any) => (
                        <CardLayout
                            key={shift._id}
                        >
                            <ShiftRecordCard ShiftRecord={shift} />
                        </CardLayout>
                    ))}
                </GridLayout>
            )}
        </div>
    );
}