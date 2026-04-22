import { ProjectSummaryProps } from "@/types/workers";
import { Progress } from "@/components/ui/progress";
import { getStatusColor } from "@/data/constants";
import { DashboardOverview } from "@/types/provider";

function ProjectSummaryCalculation({ projectData }: { projectData: DashboardOverview }) {
    const arrayedProject = Object.entries(projectData) || []
    return (
        <div className="space-y-4 overflow-y-auto">
            {arrayedProject.map(([status, number]) => {
                const progressValue = number;

                return (
                    <div key={status} className="flex flex-col">
                        <div className="flex justify-between mb-1">
                            <span className="capitalize font-medium">{status}</span>
                            <span className="text-sm font-medium">{progressValue}%</span>
                        </div>
                        <Progress
                            value={progressValue}
                            className="h-3 rounded-lg bg-white/30"
                            style={{ backgroundColor: getStatusColor(status) }}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export { ProjectSummaryCalculation }