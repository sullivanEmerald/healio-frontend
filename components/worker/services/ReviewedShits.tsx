import { ToggleLayout } from "@/components/common/toggleLayout";
import { useStore } from "@/store/store";
import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import GridLayout from "@/components/common/gridLayout";
import CardLayout from "@/components/common/cardLayout";
import { NotFoundComponent } from "@/components/common/NotFoundComponent";
import { CarerShiftApplication } from "@/types/workers";
import { CompletedShiftRecord } from "../components/CompletedShifts";


export default function ReviewedShifts() {
    const { myAssignedShifts } = useStore(useShallow((state) => ({
        myAssignedShifts: state.myAssignedShifts,
    })));

    const reviewedShifts = useMemo(() => {
        return myAssignedShifts.filter(shift => shift.status.toLowerCase() === "reviewed");
    }, [myAssignedShifts]);


    return (
        <div className="mb-4 space-y-4">
            <div className="flex align-items-center justify-between">
                <h2 className="text-lg font-semibold">Reviewed Shifts</h2>
                <ToggleLayout />
            </div>
            {reviewedShifts.length === 0 ? (
                <NotFoundComponent title="No reviewed shifts found." subTitle="You have no shifts that are reviewed." />
            ) : (
                <GridLayout>
                    {reviewedShifts.map((shift: any) => (
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