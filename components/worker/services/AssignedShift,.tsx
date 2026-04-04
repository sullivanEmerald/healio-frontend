import { ToggleLayout } from "@/components/common/toggleLayout";
import { useStore } from "@/store/store";
import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import GridLayout from "@/components/common/gridLayout";
import CardLayout from "@/components/common/cardLayout";
import { NotFoundComponent } from "@/components/common/NotFoundComponent";
import { AssignedShiftRecord } from "../components/AssignedShiftRecord";
import { CarerShiftApplication } from "@/types/workers";
import { start } from "repl";

export default function AssignedShifts() {
    const { myAssignedShifts } = useStore(useShallow((state) => ({
        myAssignedShifts: state.myAssignedShifts,
    })));

    const assignedShifts = useMemo(() => {
        return myAssignedShifts.filter(shift => shift.status.toLowerCase() === "assigned");
    }, [myAssignedShifts]);


    return (
        <div className="mb-4 space-y-4">
            <div className="flex align-items-center justify-between">
                <h2 className="text-lg font-semibold">Assigned Shifts</h2>
                <ToggleLayout />
            </div>
            {assignedShifts.length === 0 ? (
                <NotFoundComponent title="No assigned shifts found." />
            ) : (
                <GridLayout>
                    {assignedShifts.map((shift: any) => (
                        <CardLayout
                            key={shift._id}
                        >
                            <AssignedShiftRecord ShiftRecord={shift} />
                        </CardLayout>
                    ))}
                </GridLayout>
            )}
        </div>
    );
}