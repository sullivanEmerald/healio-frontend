import { WorkerpoolCardProps } from "@/types/workers"
import { Button } from "@/components/ui/button";
import DisplayAvatar from "@/components/common/avatar";
import Rating from "@/components/common/rating";
import WorkerProfile from "@/components/provider/workerProfile";
import { useState } from "react";


export default function CarerPoolCard({ fullName, skills, isAvailable, jobsCompleted, state, country, id }: WorkerpoolCardProps) {
    // const [showProfile, setShowProfile] = useState({ show: false, ca });
    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <DisplayAvatar name={fullName} />

                </div>

                {isAvailable && (
                    <span className="h-3 w-3 rounded-full bg-green-600 animate-pulse" />
                )}
            </div>
            <div>
                <p className="text-sm text-gray-500">
                    {state}, {country}
                </p>
            </div>
            {/* Stats */}
            <div className="mt-4 flex items-center gap-4 text-sm">
                <p className="text-gray-600">Jobs Completed</p>
                <p className="font-bold text-red-700">
                    {jobsCompleted || 0}
                </p>
            </div>

            {/* Skills */}

            {skills && skills.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {skills.map((skill, idx) => (
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
                className="mt-4 w-full bg-primary text-white py-2 font-semibold hover:bg-primary/90 transition"
            // onClick={() => {
            //     setSelectedWorker(worker);
            //     setShowProfile(true);
            // }}
            >
                View
            </Button>
        </>
    )

}