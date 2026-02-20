import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ServiceRequestCardProps {
    title: string
    status: string
    startDate: string
    endDate: string
    budget: number
}

export function ServiceRequestCard({
    title,
    status,
    startDate,
    endDate,
    budget,
}: ServiceRequestCardProps) {
    return (
        <Card className="border border-[#0C287B] rounded-xl">
            <CardContent className="p-5 space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">
                        {title}
                    </h3>

                    <Badge
                        className="capitalize"
                        style={{ backgroundColor: "crimson" }}
                    >
                        {status}
                    </Badge>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-gray-500">Start Date</p>
                        <p className="font-medium text-gray-800">{startDate}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">End Date</p>
                        <p className="font-medium text-gray-800">{endDate}</p>
                    </div>
                </div>

                <div className="pt-2">
                    <p className="text-sm text-gray-500">Budget</p>
                    <p className="text-base font-semibold text-[#0C287B]">
                        £{budget.toFixed(2)}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
