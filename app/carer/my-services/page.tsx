"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Underline from "@/components/common/underline"
import { ServiceRequestCard } from "@/components/provider/serviceReuest"
import { ToggleLayout } from "@/components/common/toggleLayout"
import InviteServiceRequests from "@/components/worker/dashboard/services/invites"
import AppliedShifts from "@/components/worker/services/AppliedShifts"
import AssignedShifts from "@/components/worker/services/AssignedShift,"
import { useStore } from "@/store/store"
import { useState, useCallback, useEffect } from "react"
import { Loader } from "@/components/common/loader"
import { useShallow } from "zustand/react/shallow"
import InProgressShifts from "@/components/worker/services/InProgressShifts"
import CompletedShifts from "@/components/worker/services/CompletedShifts"


export const PublishedServiceRequests = [
    {
        id: "sr-001",
        title: "Company Website Redesign",
        status: "published",
        startDate: "Mar 12, 2026",
        endDate: "Mar 30, 2026",
        budget: 250000
    },
    {
        id: "sr-002",
        title: "Social Media Content Strategy",
        status: "published",
        startDate: "Mar 18, 2026",
        endDate: "Apr 5, 2026",
        budget: 120000,
    },
];

export default function MyServices() {
    const { getMyShifts, isMyShiftsLoading } = useStore(useShallow((state) => ({
        getMyShifts: state.getMyShifts,
        isMyShiftsLoading: state.isShiftOperation.isMyShiftsLoading,
    })));

    const getShifts = useCallback(async () => {
        await getMyShifts();
    }, [getMyShifts]);


    useEffect(() => {
        getShifts();
    }, [getShifts]);

    return (
        <div className="mb-4 space-y-4">
            <div className="flex align-items-center justify-between">
                <p className="text-xl font-bold text-[#0C287B]">My Service Requests</p>
            </div>
            <Underline />
            <Tabs defaultValue="invites" className="w-full space-y-4">
                <TabsList variant="line" className="flex flex-row gap-8">
                    <TabsTrigger value="invites" className="text-primary">Invites</TabsTrigger>
                    <TabsTrigger value="applied" className="text-primary">Applied</TabsTrigger>
                    <TabsTrigger value="assigned" className="text-primary">Assigned</TabsTrigger>
                    <TabsTrigger value="inProgress" className="text-primary">In-Progress</TabsTrigger>
                    <TabsTrigger value="completed" className="text-primary">Completed</TabsTrigger>
                    <TabsTrigger value="reviewed" className="text-primary">Reviewed</TabsTrigger>
                    <TabsTrigger value="paid" className="text-primary">Paid</TabsTrigger>
                </TabsList>
                <TabsContent value="invites" className="">
                    <InviteServiceRequests />
                </TabsContent>
                <TabsContent value="applied">
                    {isMyShiftsLoading ? (
                        <Loader />
                    ) : (
                        <AppliedShifts />
                    )}
                </TabsContent>
                <TabsContent value="assigned">
                    {isMyShiftsLoading ? (
                        <Loader />
                    ) : (
                        <AssignedShifts />
                    )}
                </TabsContent>
                <TabsContent value="inProgress">
                    {isMyShiftsLoading ? (
                        <Loader />
                    ) : (
                        <InProgressShifts />
                    )}
                </TabsContent>
                <TabsContent value="completed">
                    {isMyShiftsLoading ? (
                        <Loader />
                    ) : (
                        <CompletedShifts />
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}