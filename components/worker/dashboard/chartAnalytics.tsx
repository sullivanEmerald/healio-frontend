import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ProjectSummaryCalculation } from "@/components/common/analyticsSummary";

const analytics = {
    directInvitations: 0,
    completed: 0,
    assigned: 0,
    inProgress: 0,
    applied: 0,
    pending: 0,
    approved: 0,
    paid: 0,
};

export default function ChartAnalytics() {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Analytics Summary</CardTitle>
            </CardHeader>
            <CardContent>
                <ProjectSummaryCalculation projectData={analytics} />
            </CardContent>
        </Card>
    );
}   