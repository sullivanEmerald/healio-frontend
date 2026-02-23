import GridLayout from "@/components/common/gridLayout";
import CardLayout from "@/components/common/cardLayout";
import { MyServiceRequestCard } from "@/components/worker/dashboard/MyServices";
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
    return (
        <div>
            <GridLayout>
                {InvitesServiceRequests.map((item) => (
                    <CardLayout key={item.id}>
                        <MyServiceRequestCard key={item.id} {...item} />
                    </CardLayout>
                ))}
            </GridLayout>
        </div>
    );
}
