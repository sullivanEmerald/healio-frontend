import { ToggleLayout } from "@/components/common/toggleLayout";
import { useStore } from "@/store/store";
import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import GridLayout from "@/components/common/gridLayout";
import CardLayout from "@/components/common/cardLayout";
import { NotFoundComponent } from "@/components/common/NotFoundComponent";
import { CarerShiftApplication } from "@/types/workers";
import { CompletedShiftRecord } from "../components/CompletedShifts";


export default function CompletedShifts() {
    const { myAssignedShifts } = useStore(useShallow((state) => ({
        myAssignedShifts: state.myAssignedShifts,
    })));

    const completedShifts = useMemo(() => {
        return myAssignedShifts.filter(shift => shift.status.toLowerCase() === "completed");
    }, [myAssignedShifts]);


    return (
        <div className="mb-4 space-y-4">
            <div className="flex align-items-center justify-between">
                <h2 className="text-lg font-semibold">Completed Shifts</h2>
                <ToggleLayout />
            </div>
            {completedShifts.length === 0 ? (
                <NotFoundComponent title="No completed shifts found." subTitle="You have no shifts that are completed." />
            ) : (
                <GridLayout>
                    {completedShifts.map((shift: any) => (
                        <CardLayout
                            key={shift._id}
                        >
                            <CompletedShiftRecord ShiftRecord={shift} />
                        </CardLayout>
                    ))}
                </GridLayout>
            )}
        </div>
    );
}