"use client";
import Avatar from "react-avatar";
import { Card } from "@/components/ui/card";
import Button from "@/components/common/button";
import { useState, useEffect, useCallback } from "react";
import WorkerProfile from "@/components/provider/workerProfile";
import { Worker } from "@/types/workers";
import Rating from "@/components/common/rating";
import GridLayout from "@/components/common/gridLayout";
import CardLayout from "@/components/common/cardLayout";
import DisplayAvatar from "@/components/common/avatar";
import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import ProviderHeader from "@/components/provider/components/header";
import Underline from "@/components/common/underline";
import CarerPoolCard from "./components/carersPool";

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
    const { getAllCarers, isLoading, carers } = useStore(useShallow((state) => ({
        getAllCarers: state.getAllCarers,
        isLoading: state.isLoading.isFetchingCarers,
        carers: state.carers,
    })));

    console.log("Carers from store:", useStore.getState().carers);

    const getAllCarersHandler = useCallback(() => {
        getAllCarers();
    }, [getAllCarers]);

    useEffect(() => {
        getAllCarersHandler();
    }, [getAllCarersHandler]);

    return (
        <div className="space-y-6">
            {/* Header */}
            <ProviderHeader title="Care Workers Pool" />
            <Underline />
            {/* Cards */}
            <GridLayout>
                {carers.map((worker, idx) => (
                    <CardLayout key={idx}>
                        <CarerPoolCard {...worker} />
                    </CardLayout>
                ))}
            </GridLayout>
            {showProfile && selectedWorker && (
                <WorkerProfile show={showProfile} worker={selectedWorker} onHide={() => setShowProfile(false)} />
            )}
        </div>
    );
}
