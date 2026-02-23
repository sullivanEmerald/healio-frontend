import GridLayout from "@/components/common/gridLayout";
import DisplayAvatar from "@/components/common/avatar";
import ServiceRequests from "@/components/worker/MarketSeviceRequest";

const jobListings = [
    {
        id: "1",
        providerId: "101",
        name: "Home Cleaning",
        description: "Deep cleaning for a 3-bedroom apartment.",
        startDate: "2026-03-01",
        startTime: "09:00",
        endDate: "2026-03-01",
        endTime: "12:00",
        location: "123 Main St, London",
        amount: 120,
        paymentStructure: "Hourly",
        status: "pending",
        createdAt: "2026-02-21T10:00:00Z",
        updatedAt: "2026-02-21T10:00:00Z",
        requiredSkills: ["Cleaning", "Organization"],
        clientName: "John Doe",
    },
    {
        id: "2",
        providerId: "102",
        name: "Gardening Service",
        description: "Lawn mowing and hedge trimming for a residential property.",
        startDate: "2026-03-05",
        startTime: "14:00",
        endDate: "2026-03-05",
        endTime: "16:00",
        location: "456 Oak Ave, Liverpool",
        amount: 80,
        paymentStructure: "Fixed",
        status: "approved",
        createdAt: "2026-02-20T09:00:00Z",
        updatedAt: "2026-02-21T11:00:00Z",
        requiredSkills: ["Gardening", "Landscaping"],
        clientName: "Jane Smith",
    },
    {
        id: "3",
        providerId: "101",
        name: "Dog Walking",
        description: "Daily dog walking for 2 dogs in the city park.",
        startDate: "2026-03-10",
        startTime: "08:00",
        endDate: "2026-03-10",
        endTime: "09:00",
        location: "City Park, Newcastle",
        amount: 30,
        paymentStructure: "Daily",
        status: "published",
        createdAt: "2026-02-19T08:00:00Z",
        updatedAt: "2026-02-21T12:00:00Z",
        requiredSkills: ["Dog Care", "Walking"],
        clientName: "Emily Brown",
    },
    {
        id: "4",
        providerId: "103",
        name: "Plumbing Repair",
        description: "Fix leaking kitchen sink and replace pipes.",
        startDate: "2026-03-12",
        startTime: "10:00",
        endDate: "2026-03-12",
        endTime: "13:00",
        location: "789 Pine Rd, Manchester",
        amount: 150,
        paymentStructure: "Fixed",
        status: "completed",
        createdAt: "2026-02-18T07:00:00Z",
        updatedAt: "2026-02-21T13:00:00Z",
        requiredSkills: ["Plumbing", "Repair"],
        clientName: "Michael Green",
    },
    {
        id: "5",
        providerId: "104",
        name: "Electrical Installation",
        description: "Install new lighting fixtures in office.",
        startDate: "2026-03-15",
        startTime: "15:00",
        endDate: "2026-03-15",
        endTime: "17:00",
        location: "321 Elm St, Birmingham",
        amount: 200,
        paymentStructure: "Hourly",
        status: "pending",
        createdAt: "2026-02-17T06:00:00Z",
        updatedAt: "2026-02-21T14:00:00Z",
        requiredSkills: ["Electrical", "Installation"],
        clientName: "Sarah White",
    },
    {
        id: "6",
        providerId: "105",
        name: "Carpet Cleaning",
        description: "Professional carpet cleaning for hotel lobby.",
        startDate: "2026-03-20",
        startTime: "11:00",
        endDate: "2026-03-20",
        endTime: "14:00",
        location: "654 Maple Ave, Leeds",
        amount: 180,
        paymentStructure: "Fixed",
        status: "approved",
        createdAt: "2026-02-16T05:00:00Z",
        updatedAt: "2026-02-21T15:00:00Z",
        requiredSkills: ["Cleaning", "Carpet"],
        clientName: "David Black",
    },
];

export default function MyWorkers() {
    return (
        <div className="p-4">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold">Marketplace For Available Service Requests</h1>
                <span className="text-gray-600">Find a suitable service request and be an early applicant</span>
            </div>
            <GridLayout>
                {jobListings.map((job) => (
                    <ServiceRequests key={job.id} job={job} />
                ))}
            </GridLayout>
        </div>
    );
}