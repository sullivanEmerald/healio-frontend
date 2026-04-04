import { ToggleLayout } from "@/components/common/toggleLayout";
import { useStore } from "@/store/store";
import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import GridLayout from "@/components/common/gridLayout";
import CardLayout from "@/components/common/cardLayout";
import { NotFoundComponent } from "@/components/common/NotFoundComponent";
import { CarerShiftApplication } from "@/types/workers";
import { InProgressShiftRecord } from "../components/InProgresShift";


export default function InProgressShifts() {
    const { myAssignedShifts } = useStore(useShallow((state) => ({
        myAssignedShifts: state.myAssignedShifts,
    })));

    const inProgressShifts = useMemo(() => {
        return myAssignedShifts.filter(shift => shift.status.toLowerCase() === "in-progress");
    }, [myAssignedShifts]);


    return (
        <div className="mb-4 space-y-4">
            <div className="flex align-items-center justify-between">
                <h2 className="text-lg font-semibold">In-Progress Shifts</h2>
                <ToggleLayout />
            </div>
            {inProgressShifts.length === 0 ? (
                <NotFoundComponent title="No in-progress shifts found." subTitle="You have no shifts currently running." />
            ) : (
                <GridLayout>
                    {inProgressShifts.map((shift: any) => (
                        <CardLayout
                            key={shift._id}
                        >
                            <InProgressShiftRecord ShiftRecord={shift} />
                        </CardLayout>
                    ))}
                </GridLayout>
            )}
        </div>
    );
}