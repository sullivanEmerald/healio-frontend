import { ToggleLayout } from "@/components/common/toggleLayout";
import { useStore } from "@/store/store";
import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import GridLayout from "@/components/common/gridLayout";
import CardLayout from "@/components/common/cardLayout";
import { NotFoundComponent } from "@/components/common/NotFoundComponent";
import { ShiftRecordCard } from "../components/ShiftRecord";
import { CarerShiftApplication } from "@/types/workers";

export default function AssignedShifts() {
    const { myShifts } = useStore(useShallow((state) => ({
        myShifts: state.myShifts,
    })));

    const assignedShifts = useMemo(() => {
        return myShifts.filter(shift => shift.status === "approved");
    }, [myShifts]);


    const options = [
        {
            label: "Start",
            onClick: (id: string) => console.log("Start Shift clicked", id),
        },
    ];

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
                            <ShiftRecordCard ShiftRecord={shift} showOptions={true} options={options} />
                        </CardLayout>
                    ))}
                </GridLayout>
            )}
        </div>
    );
}