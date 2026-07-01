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
import InProgressShifts from "@/components/provider/shifts/InProgessShift";
import { useShiftStatus } from "@/hooks/shiftStatus";


export default function MyServices() {
    const { listProviderShifts } = useStore(useShallow((state) => ({
        shifts: state.shifts,
        listProviderShifts: state.listProviderShifts,
    })));
    const { publishedShifts, assignedShifts, inProgressShifts, completedShifts, reviewedShifts, draftShifts } = useShiftStatus();


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
                    <TabsTrigger value="published" className="text-black cursor-pointer">Published <span className="bg-primary rounded-full text-white text-xs w-5 h-5 flex items-center justify-center">{publishedShifts.length}</span></TabsTrigger>
                    <TabsTrigger value="assigned" className="text-black cursor-pointer">Assigned <span className="bg-green-500 rounded-full text-white text-xs w-5 h-5 flex items-center justify-center">{assignedShifts.length}</span></TabsTrigger>
                    <TabsTrigger value="inProgress" className="text-black cursor-pointer">In-Progress <span className="bg-purple-500 rounded-full text-white text-xs w-5 h-5 flex items-center justify-center">{inProgressShifts.length}</span></TabsTrigger>
                    <TabsTrigger value="completed" className="text-black cursor-pointer">Completed <span className="bg-orange-500 rounded-full text-white text-xs w-5 h-5 flex items-center justify-center">{completedShifts.length}</span></TabsTrigger>
                    <TabsTrigger value="approved" className="text-black cursor-pointer">Approved <span className="bg-yellow-500 rounded-full text-white text-xs w-5 h-5 flex items-center justify-center">{reviewedShifts.length}</span></TabsTrigger>
                    <TabsTrigger value="paid" className="text-black cursor-pointer">Paid</TabsTrigger>
                    <TabsTrigger value="drafts" className="text-black cursor-pointer">Drafts <span className="bg-gray-500 rounded-full text-white text-xs w-5 h-5 flex items-center justify-center">{draftShifts.length}</span></TabsTrigger>
                </TabsList>
                <TabsContent value="drafts" className="">
                    <DraftShifts />
                </TabsContent>
                <TabsContent value="published">
                    <PublishedShifts shiftStatus="published" />
                </TabsContent>
                <TabsContent value="assigned">
                    <AssignedShifts shiftStatus="assigned" />
                </TabsContent>
                <TabsContent value="inProgress">
                    <InProgressShifts shiftStatus="in-progress" />
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