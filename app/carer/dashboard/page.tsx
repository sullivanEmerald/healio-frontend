import Underline from "@/components/common/underline";
import AnalyticsOverview from "@/components/carer/dashboard/analyticsOverView";
import ChartAnalytics from "@/components/carer/dashboard/chartAnalytics";
export default function MyWorkers() {
    return (
        <>
            <div className="">
                <h1 className="text-2xl font-bold mb-4">Analytics Overview</h1>
                <Underline />
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                    <AnalyticsOverview />
                </div>
                <div className="md:col-span-1">
                    <ChartAnalytics />
                </div>
            </div>

        </>
    );
}