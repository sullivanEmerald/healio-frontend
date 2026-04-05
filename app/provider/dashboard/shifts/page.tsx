"use client"
import { useEffect, useMemo, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ServiceRequestCard } from "@/components/provider/serviceReuest"
import CardLayout from "@/components/common/cardLayout"
import Overview from "@/components/provider/overview"
import Underline from "@/components/common/underline"
import GridLayout from "@/components/common/gridLayout"
import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import { Loader } from "@/components/common/loader";
import { NotFoundComponent } from "@/components/common/NotFoundComponent";
import PublishedShifts from "@/components/provider/shifts/PublishedShifts";
import DraftShifts from "@/components/provider/shifts/DraftShifts";
import AssignedShifts from "@/components/provider/shifts/AssignedShift";
import CompletedShifts from "@/components/provider/shifts/CompletedShifts";
import ReviewedShifts from "@/components/provider/shifts/ReviewedShifts";


export default function MyServices() {
    const { listProviderShifts } = useStore(useShallow((state) => ({
        shifts: state.shifts,
        listProviderShifts: state.listProviderShifts,
    })));


    const handleListProviderShifts = useCallback(() => {
        listProviderShifts();
    }, [listProviderShifts]);

    useEffect(() => {
        handleListProviderShifts();
    }, [handleListProviderShifts]);

    return (
        <div className="mb-4 space-y-4">
            <Overview title={'Shift Management'} />
            <Underline />
            <Tabs defaultValue="published" >
                <TabsList variant="line" className="flex flex-row gap-8 mb-4">
                    <TabsTrigger value="published" className="text-primary cursor-pointer">Published</TabsTrigger>
                    <TabsTrigger value="assigned" className="text-primary cursor-pointer">Assigned</TabsTrigger>
                    <TabsTrigger value="inProgress" className="text-primary cursor-pointer">In-Progress</TabsTrigger>
                    <TabsTrigger value="completed" className="text-primary cursor-pointer">Completed</TabsTrigger>
                    <TabsTrigger value="approved" className="text-primary cursor-pointer">Approved</TabsTrigger>
                    <TabsTrigger value="paid" className="text-primary cursor-pointer">Paid</TabsTrigger>
                    <TabsTrigger value="drafts" className="text-primary cursor-pointer">Drafts</TabsTrigger>
                </TabsList>
                <TabsContent value="drafts" className="">
                    <DraftShifts />
                </TabsContent>
                <TabsContent value="published">
                    <PublishedShifts />
                </TabsContent>
                <TabsContent value="assigned">
                    <AssignedShifts shiftStatus="assigned" />
                </TabsContent>
                <TabsContent value="inProgress">
                    <AssignedShifts shiftStatus="in-progress" />
                </TabsContent>
                <TabsContent value="completed">
                    <CompletedShifts shiftStatus="completed" />
                </TabsContent>
                <TabsContent value="approved">
                    <ReviewedShifts shiftStatus="reviewed" />
                </TabsContent>
            </Tabs>
        </div>
    )
}