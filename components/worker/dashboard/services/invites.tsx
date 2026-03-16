import GridLayout from "@/components/common/gridLayout";
import CardLayout from "@/components/common/cardLayout";
import { MyServiceRequestCard } from "@/components/worker/dashboard/MyServices";
import CustomTable from "@/components/common/customTable";
import { useMemo } from "react";


export const InvitesServiceRequests = [
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
export default function InvitedServiceRequests() {
    const columns = useMemo(() => [
        {
            accessorKey: "title",
            header: () => "Title",
            cell: (info: any) => <span>{info.value}</span>,
        },
        {
            accessorKey: "status",
            header: () => "Status",
            cell: (info: any) => <span>{info.value}</span>,
        },
        {
            accessorKey: "budget",
            header: () => "Budget",
            cell: (info: any) => <span>{info.value}</span>,
        },
        {
            accessorKey: "startDate",
            header: () => "Start Date",
            cell: (info: any) => <span>{info.value}</span>,
        },
        {
            accessorKey: "endDate",
            header: () => "End Date",
            cell: (info: any) => <span>{info.value}</span>,
        },
    ], []);

    return (
        <div>
            <GridLayout>
                {InvitesServiceRequests.map((item) => (
                    <CardLayout key={item.id}>
                        <MyServiceRequestCard key={item.id} {...item} />
                    </CardLayout>
                ))}
            </GridLayout>
            <CustomTable
                data={InvitesServiceRequests}
                columns={columns}
                currentPage={1}
                totalPages={5}
                onPageChange={() => { }}
            />
        </div>
    );
}
