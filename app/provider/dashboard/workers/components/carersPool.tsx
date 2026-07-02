import { WorkerpoolCardProps } from "@/types/workers"
import Button from "@/components/common/button";
import DisplayAvatar from "@/components/common/avatar";
import Rating from "@/components/common/rating";
import WorkerProfile from "@/components/provider/workerProfile";
import { useState } from "react";
import CarerProfile from "./carerProfile";


export default function CarerPoolCard({ worker }: { worker: WorkerpoolCardProps }) {
    const [showProfile, setShowProfile] = useState({ show: false, carer: null as WorkerpoolCardProps | null });
    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <DisplayAvatar name={worker.fullName} />

                </div>

                {worker.isAvailable && (
                    <span className="h-3 w-3 rounded-full bg-green-600 animate-pulse" />
                )}
            </div>
            <div>
                <p className="text-sm text-gray-500">
                    {worker.state} {worker.country}
                </p>
            </div>
            {/* Stats */}
            <div className="mt-4 flex items-center gap-4 text-sm">
                <p className="text-gray-600">Jobs Completed</p>
                <p className="font-bold text-red-700">
                    {worker.jobsCompleted || 0}
                </p>
            </div>

            {/* Skills */}

            {worker.skills && worker.skills.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {worker.skills.map((skill, idx) => (
                        <span
                            key={idx}
                            className="px-3 py-1 text-xs font-medium
                                          rounded-full bg-[#140f30]/10
                                          text-[#140f30]"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            )}
            {/* Rating */}
            <div className="mt-4 flex items-center gap-2">
                <span className="text-sm text-gray-600">Rating:</span>
                <Rating value={10} />
            </div>
            <Button
                onClick={() => {
                    setShowProfile({ show: true, carer: worker });
                }}
            >
                View
            </Button>
            {showProfile.show && showProfile.carer && (
                <CarerProfile show={showProfile.show} worker={showProfile.carer} onHide={() => setShowProfile({ show: false, carer: null })} />
            )}
        </>
    )

}