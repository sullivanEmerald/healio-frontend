"use client";
import Avatar from "react-avatar";
import { Card } from "@/components/ui/card";
import Button from "@/components/common/button";
import { useState } from "react";
import WorkerProfile from "@/components/provider/workerProfile";
import { Worker } from "@/types/workers";
import Rating from "@/components/common/rating";

const ProvidersPool: Worker[] = [
    {
        name: "Michelle Amadike",
        skills: ["JavaScript", "Python", "PHP"],
        isAvailable: false,
        status: "active",
        country: "London",
        state: "Liverpool",
        jobsCompleted: 15,
        rating: 5.0,
        id: "1",
    },
    {
        name: "Sullivan Amadike",
        skills: ["JavaScript", "Python", "PHP"],
        isAvailable: true,
        status: "active",
        country: "London",
        state: "Liverpool",
        jobsCompleted: 15,
        rating: 4.9,
        id: "2",
    },
    {
        name: "Brandon Emerald",
        skills: ["JavaScript", "Python", "PHP"],
        isAvailable: true,
        status: "active",
        country: "London",
        state: "Newcastle",
        jobsCompleted: 10,
        rating: 4.2,
        id: "3",
    },
    {
        name: "Joshua Emerald",
        skills: ["JavaScript", "Python", "PHP"],
        isAvailable: true,
        status: "active",
        country: "London",
        state: "Newcastle",
        jobsCompleted: 10,
        rating: 4.5,
        id: "4",
    },
    {
        name: "Precious Awuzu",
        skills: ["JavaScript", "Python", "PHP"],
        isAvailable: true,
        status: "active",
        country: "London",
        state: "Newcastle",
        jobsCompleted: 10,
        rating: 2.8,
        id: "5",
    },

    {
        name: "Mirable Awuzu",
        skills: ["JavaScript", "Python", "PHP"],
        isAvailable: true,
        status: "active",
        country: "London",
        state: "Newcastle",
        jobsCompleted: 10,
        rating: 3.6,
        id: "6",
    },

];

export default function MyWorkers() {
    const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
    const [showProfile, setShowProfile] = useState(false);
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-[#0C287B]">Workers Pool</h2>
                <span className="h-3 w-3 rounded-full bg-green-600 animate-pulse" />
            </div>

            <hr className="border-primary/20" />

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ProvidersPool.map((worker, idx) => (
                    <Card
                        key={idx}
                        className="border border-primary/30 rounded-2xl p-4
                       hover:shadow-lg transition-shadow duration-300"
                    >
                        {/* Top section */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Avatar name={worker.name} size="40" round />
                                <div>
                                    <p className="font-semibold text-gray-900">
                                        {worker.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {worker.state}, {worker.country}
                                    </p>
                                </div>
                            </div>

                            {worker.isAvailable && (
                                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                                    Available
                                </span>
                            )}
                        </div>

                        {/* Stats */}
                        <div className="mt-4 flex items-center justify-between text-sm">
                            <p className="text-gray-600">Jobs Completed</p>
                            <p className="font-bold text-[#0C287B]">
                                {worker.jobsCompleted}
                            </p>
                        </div>

                        {/* Skills */}
                        {worker.skills.length > 0 && (
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
                            <Rating value={worker.rating} />
                        </div>
                        <Button
                            className="mt-4 w-full bg-primary text-white py-2 font-semibold hover:bg-primary/90 transition"
                            onClick={() => {
                                setSelectedWorker(worker);
                                setShowProfile(true);
                            }}
                        >
                            View
                        </Button>
                    </Card>
                ))}
            </div>
            {showProfile && selectedWorker && (
                <WorkerProfile show={showProfile} worker={selectedWorker} onHide={() => setShowProfile(false)} />
            )}
        </div>
    );
}
