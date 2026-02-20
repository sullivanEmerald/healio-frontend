"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ServiceRequestCard } from "@/components/common/serviceReuest"
import { Row, Col } from "react-bootstrap"

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
            <div className="flex align-items-center justify-between">
                <p className="text-xl font-bold text-[#0C287B]">Service Requests</p>
                <Button className="bg-[#0C287B] p-6 flex items-center gap-2 rounded-xl">
                    <Plus size={30} className="text-white" />
                    <span className="text-md">Create Service Request</span>
                </Button>
            </div>
            <hr />
            <Tabs defaultValue="drafts">
                <TabsList variant="line" className="flex flex-row gap-8">
                    <TabsTrigger value="drafts" className="text-[#0C287B]">Drafts</TabsTrigger>
                    <TabsTrigger value="published" className="text-[#0C287B]">Published</TabsTrigger>
                    <TabsTrigger value="reports" className="text-[#0C287B]">Assigned</TabsTrigger>
                    <TabsTrigger value="inProgress" className="text-[#0C287B]">In-Progress</TabsTrigger>
                    <TabsTrigger value="completed" className="text-[#0C287B]">Completed</TabsTrigger>
                    <TabsTrigger value="approved" className="text-[#0C287B]">Approved</TabsTrigger>
                    <TabsTrigger value="paid" className="text-[#0C287B]">Paid</TabsTrigger>
                </TabsList>
                <TabsContent value="drafts">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                        {draftServiceRequests.map((item) => (
                            <ServiceRequestCard key={item.id} {...item} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="published">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                        {PublishedServiceRequests.map((item) => (
                            <ServiceRequestCard key={item.id} {...item} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="analytics">Change your password here.</TabsContent>
            </Tabs>
        </div>
    )
}