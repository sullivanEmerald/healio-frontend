"use client";
import { Users, Briefcase, CheckCircle, Clock, User, MessageCircle, Plus } from "lucide-react";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getStatusColor, getIcon } from "@/data/constants";
import Overview from "@/components/provider/overview";
import { ProjectSummaryCalculation } from "@/components/common/analyticsSummary";
import Underline from "@/components/common/underline";
import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useMemo } from "react";
import DashboardStatus from "@/components/provider/components/dashboard/dashboardStatus";
import { Fragment } from "react";
import { Loader } from "@/components/common/loader";

const OVERVIEW = [
    {
        title: "Published Projects",
        value: 45,
        icon: Users,
        name: "published"
    },
    {
        title: "In-Progress Projects",
        value: 12,
        icon: Briefcase,
        name: 'inProgress'
    },
    {
        title: "Pending Approvals",
        value: 5,
        icon: Clock,
        name: 'pending'
    },
    {
        title: "Completed Projects",
        value: 10,
        icon: CheckCircle,
        name: "completed"
    },
    {
        title: "Total Workers Assigned",
        value: 10,
        icon: User,
        name: "workers"
    },
    {
        title: "Total Shifts",
        value: 10,
        icon: MessageCircle,
        name: "totalShifts"
    },
    {
        title: "Total Workers",
        value: 10,
        icon: MessageCircle,
        name: "totalWorkers"
    },
];

export default function DashboardPage() {
    const { dashboardOverview, isLoading, getDashboardOverview } = useStore(useShallow((state) => ({
        dashboardOverview: state.dashboardOverview,
        isLoading: state.isLoading.isfetchingDashboardOverview,
        getDashboardOverview: state.getDashboardOverview,
    })));

    const memorizedArrayedProject = useMemo(() => {
        return Object.entries(dashboardOverview || {}).map(([key, value]) => ({ statusKey: key, value, title: OVERVIEW.find(item => item.name === key)?.title || key, name: key }));
    }, [dashboardOverview]);


    useEffect(() => {
        getDashboardOverview();
    }, [])

    return (
        <section className="w-full min-h-screen space-y-4">
            <Overview title="Dashboard Overview" />
            <Underline />
            {isLoading ? (
                <Loader />
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <div className="col-span-1 lg:col-span-3 flex flex-col justify-between">
                        <div className="grid grid-cols-2 gap-4">
                            {memorizedArrayedProject.map((item, i) => (
                                <Fragment key={i}>
                                    <DashboardStatus {...item} />
                                </Fragment>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="col-span-1 lg:col-span-2 ">
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold">Projects Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {dashboardOverview && (
                                    <ProjectSummaryCalculation projectData={dashboardOverview} />
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </section>

    );
}

