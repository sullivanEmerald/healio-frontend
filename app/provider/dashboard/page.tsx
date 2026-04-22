import { Users, Briefcase, CheckCircle, Clock, User, MessageCircle, Plus } from "lucide-react";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getStatusColor } from "@/data/constants";
import Overview from "@/components/provider/overview";
import { ProjectSummaryCalculation } from "@/components/common/analyticsSummary";
import Underline from "@/components/common/underline";

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
        title: "Total Notifications",
        value: 10,
        icon: MessageCircle,
        name: "Notifications"
    },
];

export const projectData = {
    pending: 1,
    published: 2,
    inProgress: 15,
    completed: 40,
    assigned: 5,
    approved: 6,
    paid: 7,
};

export default function DashboardPage() {
    return (
        <section className="w-full min-h-screen space-y-4">
            <Overview title="Dashboard Overview" />
            <Underline />
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="col-span-1 lg:col-span-3 flex flex-col justify-between">
                    <div className="grid grid-cols-2 gap-4">
                        {OVERVIEW.map((item, i) => {
                            const Icon = item.icon;
                            const color = getStatusColor(item.name)
                            return (
                                <div
                                    key={i}
                                    className="flex items-center gap-6 rounded-2xl px-6 py-8 shadow-md hover:shadow-lg transition min-h-[150px]"
                                    style={{ backgroundColor: color }}
                                >
                                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/20">
                                        <Icon size={26} className="text-white" />
                                    </div>

                                    <div className="text-white">
                                        <p className="text-sm opacity-80 mb-1">
                                            {item.title}
                                        </p>
                                        <p className="text-3xl font-bold">
                                            {item.value}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {/* <div className="flex align-items-center justify-between">
                        <p className="text-2xl font-bold text-[#0C287B]">Your profile is yet to be completed 0%</p>
                        <Button className="rounded-lg bg-[#224074] text-white">
                            Update Profile
                        </Button>
                    </div> */}
                </div>

                {/* RIGHT */}
                <div className="col-span-1 lg:col-span-2 ">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Projects Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ProjectSummaryCalculation projectData={projectData} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

    );
}

