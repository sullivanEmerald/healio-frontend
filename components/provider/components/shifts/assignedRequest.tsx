import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import moment from "moment"
import { formatPrice } from "@/utility/util"
import DisplayAvatar from "@/components/common/avatar"
import { getStatusColor } from "@/data/constants"
import Button from "@/components/common/button"
import Underline from "@/components/common/underline"
import { Shift } from "@/types/shifts"
import { CardDropdown } from "@/components/common/CardDropdown"


interface AssignedRequestCardProps {
    shiftId: Shift
    providerId: string;
    _id: string;
    options?: Array<{ label: string; onClick?: () => void; href?: string }>;
    carerId?: {
        firstName: string;
        lastName: string;
        _id: string;
    } | null;
    createdAt: string;
    updatedAt: string;
    status: string;
}


export function AssignedRequestCard({
    shiftId,
    providerId,
    _id,
    options,
    carerId,
    createdAt,
    updatedAt,
    status
}: AssignedRequestCardProps) {
    return (
        <Card className="shadow-none bg-transparent border-none p-0 cursor-pointer">
            <CardContent className="space-y-6 shadow-none bg-transparent p-0">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                        <DisplayAvatar name={shiftId.title} />
                    </h3>

                    {options && (
                        <span onClick={e => e.stopPropagation()}>
                            <CardDropdown options={options} id={_id} />
                        </span>
                    )}
                </div>

                <p className="text-gray-700 line-clamp-1">{shiftId.description}</p>

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
                        <p className="font-medium text-gray-800">{moment(shiftId.startDate).format("MMMM Do YYYY")}</p>
                    </div>

                    <div>
                        <p className="text-gray-500">End Date</p>
                        <p className="font-medium text-gray-800">{moment(shiftId.endDate).format("MMMM Do YYYY")}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <p className="text-base font-semibold text-primary">
                        £{formatPrice(shiftId.amount ?? "0.00")}
                    </p>
                    <span className="text-xs bg-green-100 px-2 py-1 rounded text-gray-700">{shiftId.shiftType}</span>
                </div>
                <Underline />
                <div>
                    <span className="font-medium text-gray-500 ml-2">Assigned To:</span>
                    <span className="font-medium text-red-500 ml-2">{carerId?.firstName} {carerId?.lastName}</span>
                </div>
                <Underline />
                {/* <Button className="w-full" onClick={() => console.log("View details for service request with ID:")}>
                    View
                </Button> */}
            </CardContent>
        </Card>
    )
}
