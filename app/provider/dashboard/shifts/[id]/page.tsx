"use client";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import DisplayAvatar from "@/components/common/avatar";
import { getAccountTypeDisplay } from "@/data/constants";
import Underline from "@/components/common/underline";
import { getStatusColor } from "@/data/constants";
import Button from "@/components/common/button";
import moment from "moment";
import { Back } from "@/components/common/back";
import { Loader } from "@/components/common/loader";
import { NotFoundComponent } from "@/components/common/NotFoundComponent";
import { AppliedShifts } from "@/components/provider/shifts/AppliedShifts";
import GridLayout from "@/components/common/gridLayout";

export default function ShiftDetailsPage() {
    const { id } = useParams();
    const { shift, fetchShift, isfetchingById, shiftApplications } = useStore(useShallow((state) => ({
        shift: state.shift,
        fetchShift: state.fetchShift,
        isfetchingById: state.isLoading.isfetchingById,
        shiftApplications: state.applications
    })));

    useEffect(() => {
        if (id) fetchShift(id as string);
    }, [id]);


    return (
        <div className="mb-6">
            <Back />
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 mb-4">
                    <DisplayAvatar name={shift?.title} canShowName={false} />
                    <h2 className="text-3xl text-gray-800 font-semibold">{getAccountTypeDisplay(shift?.title ?? null)}</h2>
                    {/* <Badge variant="default" className="ml-2 capitalize text-sm px-3 py-1" style={{ backgroundColor: getStatusColor(shift?.status || "") }} >{shift?.status}</Badge> */}
                </div>
                <Button>
                    Stop Reoccuring
                </Button>
            </div>
            <Underline />

            <Tabs defaultValue="details" className="w-full mt-6">
                <TabsList className="mb-6">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="applications">Applications</TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                    {isfetchingById ? (
                        <Loader />
                    ) : shift ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                                <h2 className="text-xl font-semibold mb-4 text-primary">General Information</h2>
                                <Underline />
                                <div className="space-y-4">
                                    <div className="text-black text-lg font-medium flex flex-col"><span className="text-muted-foreground">Title:</span> {shift.title}</div>
                                    <div className="text-black text-lg font-medium flex flex-col"><span className="text-muted-foreground">Description:</span> {shift.description}</div>
                                    <div className="text-black text-lg font-medium flex flex-col"><span className="text-muted-foreground">Shift Type:</span> {shift.shiftType}</div>
                                    <div className="text-black text-lg font-medium flex flex-col"><span className="text-muted-foreground">Number of Carers:</span> {shift.numberOfCarers}</div>
                                    <div className="text-black text-lg font-medium flex flex-col"><span className="text-muted-foreground">Skills:</span> {shift.skills}</div>
                                    <div className="text-black text-lg font-medium flex flex-col"><span className="text-muted-foreground">Experience:</span> {shift.experience}</div>
                                    <div className="text-black text-lg font-medium flex flex-col"><span className="text-muted-foreground">Gender Preference:</span> {shift.genderPreference}</div>
                                    <div className="text-black text-lg font-medium flex flex-col"><span className="text-muted-foreground">Language:</span> {shift.language}</div>
                                </div>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                                <h2 className="text-xl font-semibold mb-4 text-primary">Timing & Payment</h2>
                                <Underline />
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-muted-foreground">Start Date:</span>
                                        <span className="text-green-600 font-semibold">{moment(shift.startDate).format("MMMM Do YYYY")}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-muted-foreground">End Date:</span>
                                        <span className="text-red-600 font-semibold">{moment(shift.endDate).format("MMMM Do YYYY")}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-muted-foreground">Start Time:</span>
                                        <span className="text-green-600 font-semibold">{shift.startTime}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-muted-foreground">End Time:</span>
                                        <span className="text-red-600 font-semibold">{shift.endTime}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-muted-foreground">Amount:</span>
                                        <span className="text-blue-600 font-bold">£{shift.amount || "0.00"}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-muted-foreground">Expenses:</span>
                                        <span className="font-medium text-muted-foreground">{shift.expenses}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-muted-foreground">Enhanced DBS:</span>
                                        <Badge variant={shift.enhancedDBS ? "default" : "outline"} className="capitalize">{shift.enhancedDBS ? "Required" : "Not Required"}</Badge>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-muted-foreground">Right to Work:</span>
                                        <Badge variant={shift.rightToWork ? "default" : "outline"} className="capitalize">{shift.rightToWork ? "Required" : "Not Required"}</Badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <NotFoundComponent title="Shift not found" subTitle="The shift you are looking for does not exist." />
                    )}
                </TabsContent>
                <TabsContent value="applications">
                    <AppliedShifts />
                </TabsContent>
            </Tabs>
        </div>
    );
}