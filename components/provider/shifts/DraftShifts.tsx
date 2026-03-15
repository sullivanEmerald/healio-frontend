
import { useStore } from "@/store/store";
import { useMemo } from "react";
import { ServiceRequestCard } from "../serviceReuest";
import GridLayout from "@/components/common/gridLayout";
import CardLayout from "@/components/common/cardLayout";
import { Loader } from "@/components/common/loader";
import { NotFoundComponent } from "@/components/common/NotFoundComponent";
import { useShallow } from "zustand/react/shallow";

export default function DraftShifts() {
    const { shifts, isLoading } = useStore(useShallow((state) => ({
        shifts: state.shifts,
        isLoading: state.isLoading,
    })));

    const draftShifts = useMemo(() => {
        return shifts.filter(shift => shift.status === "draft");
    }, [shifts]);

    return (
        <div>
            <h2 className="text-2xl font-bold text-primary mb-2">Draft Shifts</h2>
            {isLoading ? (
                <Loader />
            ) : draftShifts.length === 0 ? (
                <NotFoundComponent
                    title="No Draft Shifts Found"
                    subTitle="It seems you don't have any draft shifts at the moment."
                    buttonText="Create Shift"
                    onButtonClick={() => console.log("Create Shift")}
                />
            ) : (
                <GridLayout>
                    {draftShifts.map(shift => (
                        <CardLayout key={shift.id}>
                            <ServiceRequestCard {...shift} />
                        </CardLayout>
                    ))}
                </GridLayout>
            )}
        </div>
    );
}