"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ServiceRequestCard } from "@/components/provider/serviceReuest"
import CardLayout from "@/components/common/cardLayout"
import Overview from "@/components/provider/overview"
import Underline from "@/components/common/underline"

export const draftServiceRequests = [
    {
        id: "sr-001",
        title: "Company Website Redesign",
        status: "draft",
        startDate: "Mar 12, 2026",
        endDate: "Mar 30, 2026",
        budget: 250000
    },
    {
        id: "sr-002",
        title: "Social Media Content Strategy",
        status: "draft",
        startDate: "Mar 18, 2026",
        endDate: "Apr 5, 2026",
        budget: 120000,
    },
    {
        id: "sr-003",
        title: "Software Engineer",
        status: "draft",
        startDate: "Mar 18, 2026",
        endDate: "Apr 5, 2026",
        budget: 120000,
    },
];

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
    return (
        <div className="mb-4 space-y-4">
            <Overview title={'Shift Management'} />
            <Underline />
            <Tabs defaultValue="drafts">
                <TabsList variant="line" className="flex flex-row gap-8">
                    <TabsTrigger value="drafts" className="text-primary">Drafts</TabsTrigger>
                    <TabsTrigger value="published" className="text-primary">Published</TabsTrigger>
                    <TabsTrigger value="reports" className="text-primary">Assigned</TabsTrigger>
                    <TabsTrigger value="inProgress" className="text-primary">In-Progress</TabsTrigger>
                    <TabsTrigger value="completed" className="text-primary">Completed</TabsTrigger>
                    <TabsTrigger value="approved" className="text-primary">Approved</TabsTrigger>
                    <TabsTrigger value="paid" className="text-primary">Paid</TabsTrigger>
                </TabsList>
                <TabsContent value="drafts">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                        {draftServiceRequests.map((item) => (
                            <CardLayout key={item.id}>
                                <ServiceRequestCard {...item} />
                            </CardLayout>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="published">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                        {PublishedServiceRequests.map((item) => (
                            <CardLayout key={item.id}>
                                <ServiceRequestCard {...item} />
                            </CardLayout>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="analytics">Change your password here.</TabsContent>
            </Tabs>
        </div>
    )
}