"use client";
import Avatar from "react-avatar";
import { Card } from "@/components/ui/card";
import Button from "@/components/common/button";
import { useState, useEffect, useCallback, useMemo } from "react";
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
import { Loader } from "@/components/common/loader";
import { NotFoundComponent } from "@/components/common/NotFoundComponent";
import CustomTable from "@/components/common/customTable";
import { WorkerpoolCardProps } from "@/types/workers";
import CarerProfile from "./components/carerProfile";

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
    const [selectedWorker, setSelectedWorker] = useState<WorkerpoolCardProps | null>(null);
    const [showProfile, setShowProfile] = useState(false);

    const { getAllCarers, isLoading, carers, isMenuGrid } = useStore(useShallow((state) => ({
        getAllCarers: state.getAllCarers,
        isLoading: state.isLoading.isFetchingCarers,
        carers: state.carers,
        isMenuGrid: state.isMenuBarGrid,
    })));

    const getAllCarersHandler = useCallback(() => {
        getAllCarers();
    }, [getAllCarers]);

    useEffect(() => {
        getAllCarersHandler();
    }, [getAllCarersHandler]);

    const columns = useMemo(() => [
        {
            accessorKey: "fullName",
            header: () => "Name",
            cell: (info: any) => {
                return (
                    <div className="flex items-center gap-3">
                        <DisplayAvatar name={info.value} />
                        {/* <span>{info.value}</span> */}
                    </div>
                );
            },
        },
        {
            accessorKey: "jobsCompleted",
            header: () => "Jobs Completed",
            cell: (info: any) => {
                return (
                    <span className="text-red-700 font-bold">
                        {info.value || 0}
                    </span>
                );
            },
        },
        {
            accessorKey: "action",
            header: () => "Action",
            cell: (info: any) => {
                return (
                    <span className="text-red-700 font-medium cursor-pointer underline" onClick={(e) => {
                        e.stopPropagation();
                        setSelectedWorker(info.row);
                        setShowProfile(true);
                    }}>
                        View
                    </span>
                );
            },
        }
    ], []);
    return (
        <>
            <div className="space-y-6">
                {/* Header */}
                <ProviderHeader title="Care Workers Pool" />
                <Underline />
                {/* Cards */}
                {isLoading ? (
                    <Loader />
                ) : carers.length === 0 ? (
                    <NotFoundComponent title="No carers found" subTitle="Carers are not available at the moment. Check again later." />
                ) : (
                    <>
                        {isMenuGrid === "grid" ? (
                            <GridLayout>
                                {carers.map((worker, idx) => (
                                    <CardLayout key={idx}>
                                        <CarerPoolCard worker={worker} />
                                    </CardLayout>
                                ))}
                            </GridLayout>
                        ) : (
                            <CustomTable
                                data={carers}
                                columns={columns}
                                currentPage={1}
                                totalPages={5}
                                onPageChange={() => { }}
                                onRowClick={() => { }}
                            />
                        )}
                    </>
                )}

            </div>
            {showProfile && selectedWorker && (
                <CarerProfile
                    show={showProfile}
                    onHide={() => setShowProfile(false)}
                    worker={selectedWorker}
                />
            )}
        </>
    );
}
