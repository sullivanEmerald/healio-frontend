import Button from "@/components/common/button";
import CustomDrawer from "@/components/common/drawer";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import Avatar from "react-avatar";
import Rating from "@/components/common/rating";
import { X } from "lucide-react";
import CloseButton from "@/components/common/closeButton";
import { WorkerpoolCardProps } from "@/types/workers";
import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import LineLoader from "@/components/common/lineLoader";


export default function CarerProfile({ show, onHide, worker }: { show: boolean; onHide: () => void; worker: WorkerpoolCardProps }) {
    const { addToPool, isLoading, } = useStore(useShallow((state) => ({
        addToPool: state.addCarerToPool,
        isLoading: state.isLoading.isAddingCarerToPool,
    })));
    return (
        <CustomDrawer show={show} onHide={onHide} header={`${worker?.fullName} Profile`}>
            <div className="no-scrollbar overflow-y-auto px-4 py-6 space-y-8 flex-1">
                <div className="flex items-center gap-4">
                    <Avatar name={worker?.fullName} size="40" round />
                    <div>
                        <p className="font-semibold text-lg text-primary">{worker?.fullName}</p>
                        <p className="text-sm text-gray-500">
                            {worker?.state}, {worker?.country}
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    {worker?.skills && worker.skills.map((skill: string, idx: number) => (
                        <span
                            key={idx}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    {worker?.isAvailable ? (
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium flex items-center justify-center">
                            Available
                        </span>
                    ) : (
                        <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700 font-medium flex items-center justify-center">
                            Swapped Out
                        </span>
                    )}
                    <div className="text-xs px-2 py-1 rounded-full bg-gray-100 font-medium text-center">
                        <p className="text-xs text-gray-500 mb-1">Jobs Completed</p>
                        <span className="text-xs px-2 py-1 text-red-700 font-medium">{worker?.jobsCompleted || 0}</span>
                    </div>
                </div>
                <div>
                    <p className="font-bold text-primary/80 text-lg">Rating:</p>
                    <Rating value={worker?.rating || 0} />
                </div>
            </div>
            <div className="flex items-center gap-3 px-4 pb-6 w-full">
                <Button onClick={onHide} className="w-1/2">
                    Close
                </Button>
                <Button
                    className="w-1/2"
                    onClick={async () => {
                        try {
                            await addToPool(worker?.id);
                            onHide();
                        } catch (error) {
                            console.log("Error adding carer to pool:", error);
                        }
                    }}
                    disabled={isLoading}
                >
                    {isLoading ? <LineLoader /> : "Add to Pool"}
                </Button>
            </div>
        </CustomDrawer>
    );
}