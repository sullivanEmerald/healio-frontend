import CustomDrawer from "@/components/common/drawer";
import { CarerMiniProfileType } from "@/types/provider";
import DisplayAvatar from "@/components/common/avatar";
import Button from "@/components/common/button";
import LineLoader from "@/components/common/lineLoader";
import { useState } from "react";
import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";

export default function CarerMiniProfile({ show, onHide, header, carer, applicationId }: { show: boolean; onHide: () => void; header: string, carer: CarerMiniProfileType, applicationId: string }) {
    const { isApproving, approveApplication } = useStore(useShallow(state => ({
        isApproving: state.isLoading.isApproving,
        approveApplication: state.approveApplication,
    })));

    return (
        <CustomDrawer show={show} onHide={onHide} header={`${carer.firstName} ${carer.lastName}'s Profile`}>
            <main className="space-y-4 p-4 flex flex-col h-full">
                <div className="flex items-center gap-4">
                    <DisplayAvatar name={`${carer.firstName} ${carer.lastName}`} />
                </div>

                <div className="flex items-center gap-3 pb-6 w-full self-end mt-auto">
                    <Button
                        onClick={() => {
                            if (isApproving) return;
                            onHide();
                        }}
                        className="w-1/2"
                    >
                        Close
                    </Button>
                    <Button className="w-1/2" disabled={isApproving} onClick={async () => {
                        if (isApproving) return;
                        await approveApplication(applicationId);
                        onHide();
                    }}  >
                        {isApproving ? <LineLoader /> : "Approve"}
                    </Button>
                </div>
            </main>
        </CustomDrawer >
    );
}
