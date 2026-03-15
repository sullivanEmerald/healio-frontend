import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import moment from "moment"
import { formatPrice } from "@/utility/util"
import { CardDropdown } from "@/components/common/CardDropdown"

interface ServiceRequestCardProps {
    title: string,
    description?: string,
    status: string,
    startDate: string,
    endDate: string,
    budget?: number,
    hourlyRate?: string,
}


export function PublishedShiftCard({
    title,
    status,
    startDate,
    endDate,
    budget,
    hourlyRate,
    description
}: ServiceRequestCardProps) {
    return (
        <Card className="shadow-none bg-transparent border-none p-0 cursor-pointer">
            <CardContent className="space-y-4 shadow-none bg-transparent p-0">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">
                        {title}
                    </h3>
                    <div className="flex items-center gap-2">
                        <Badge
                            className="capitalize truncate"
                            style={{ backgroundColor: "crimson" }}
                        >
                            {status}
                        </Badge>
                        <CardDropdown
                            options={[
                                { label: "Modify", onClick: () => {/* handle modify */ } },
                                { label: "Unpublish", onClick: () => {/* handle unpublish */ } },
                            ]}
                        />
                    </div>
                </div>


                {/* Dates */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-gray-500">Start Date</p>
                        <p className="font-medium text-gray-800">{moment(startDate).format("MMMM Do YYYY")}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">End Date</p>
                        <p className="font-medium text-gray-800">{moment(endDate).format("MMMM Do YYYY")}</p>
                    </div>
                </div>

                {/* Description */}
                <p className="font-medium bg-secondary text-white line-clamp-2 p-2 rounded-md">{description}</p>

                <div className="">
                    <p className="text-sm text-gray-500">Budget</p>
                    <p className="text-base font-semibold text-primary">
                        £{formatPrice(hourlyRate ?? 0)}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
