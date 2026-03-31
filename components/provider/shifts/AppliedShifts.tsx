import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import { Loader } from "@/components/common/loader";
import { NotFoundComponent } from "@/components/common/NotFoundComponent";

export const AppliedShifts = () => {
    const { isfetchingById, shiftApplications } = useStore(useShallow((state) => ({
        isfetchingById: state.isLoading.isfetchingById,
        shiftApplications: state.applications
    })));

    return (
        isfetchingById ? (
            <Loader />
        ) : shiftApplications.length === 0 ? (
            <NotFoundComponent title="No Applications Found" subTitle="You have not applied for any shifts yet." />
        ) : (
            <span>Sullivan</span>
        )
    );
}