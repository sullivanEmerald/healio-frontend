"use client";
import { useState } from "react";
import { Job } from "@/types/workers";
import CardLayout from "../common/cardLayout";
import DisplayAvatar from "../common/avatar";
import Button from "../common/button";
import moment from "moment";
import WorkerProfile from "./serviceProfile";

export default function ServiceRequests({ job }: { job: Job }) {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <CardLayout>
            <div className="flex items-center gap-4">
                <DisplayAvatar name={job.name} />
            </div>
            <p className="text-gray-700 mb-2 line-clamp-1">{job.description}</p>
            <div className="flex flex-wrap gap-2">
                {job.requiredSkills.map((skill, idx) => (
                    <span
                        key={idx}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-[#140f30]/10 text-[#140f30]"
                    >
                        {skill}
                    </span>
                ))}
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                <span className="text-sm text-red-500 font-semibold">{job.location}</span>
            </div>
            <div className="flex items-center gap-4">
                <span className="font-bold text-lg text-primary">${job.amount}</span>
                <span className="text-xs bg-green-100 px-2 py-1 rounded text-gray-700">{job.paymentStructure}</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Client:</span>
                <span className="text-sm font-medium text-gray-800">{job.clientName}</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Posted</span>
                <span className="text-sm font-medium text-gray-800">{moment(job.createdAt).fromNow()}</span>
            </div>
            <Button onClick={() => setShowDetails(true)}>
                {"Details"}
            </Button>
            {showDetails && (
                <WorkerProfile show={showDetails} job={job} onHide={() => setShowDetails(false)} />
            )}
        </CardLayout>
    );
}
