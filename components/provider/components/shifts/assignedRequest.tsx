import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import moment from "moment"
import { formatPrice } from "@/utility/util"
import DisplayAvatar from "@/components/common/avatar"
import { getStatusColor } from "@/data/constants"
import Button from "@/components/common/button"
import Underline from "@/components/common/underline"


interface AssignedRequestCardProps {
    title: string,
    description?: string,
    status: string,
    startDate: string,
    endDate: string,
    budget?: number,
    amount?: string,
    shiftType: string,
    _id: string;
    options?: Array<{ label: string; onClick?: () => void; href?: string }>;
    assignedCarerId?: {
        firstName: string;
        lastName: string;
        _id: string;
    } | null;
}


export function AssignedRequestCard({
    title,
    status,
    startDate,
    endDate,
    shiftType,
    amount,
    description,
    options,
    assignedCarerId,
    _id
}: AssignedRequestCardProps) {
    return (
        <Card className="shadow-none bg-transparent border-none p-0 cursor-pointer">
            <CardContent className="space-y-6 shadow-none bg-transparent p-0">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                        <DisplayAvatar name={title} />
                    </h3>

                    {/* <CardDropdown
                        options={options}
                        id={_id}
                    /> */}
                </div>

                <p className="text-gray-700 line-clamp-1">{description}</p>

                <Badge
                    className="capitalize truncate"
                    style={{ backgroundColor: getStatusColor(status.toLowerCase()) }}
                >
                    {status}
                </Badge>

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
                <div className="flex items-center gap-4">
                    <p className="text-base font-semibold text-primary">
                        £{formatPrice(amount ?? "0.00")}
                    </p>
                    <span className="text-xs bg-green-100 px-2 py-1 rounded text-gray-700">{shiftType}</span>
                </div>
                <Underline />
                <div>
                    <span className="font-medium text-gray-500 ml-2">Assigned To:</span>
                    <span className="font-medium text-red-500 ml-2">{assignedCarerId?.firstName} {assignedCarerId?.lastName}</span>
                </div>
                <Underline />
                {/* <Button className="w-full" onClick={() => console.log("View details for service request with ID:")}>
                    View
                </Button> */}
            </CardContent>
        </Card>
    )
}
