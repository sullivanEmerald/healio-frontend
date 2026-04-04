import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import moment from "moment"
import { formatPrice } from "@/utility/util"
import DisplayAvatar from "@/components/common/avatar"
import { getStatusColor } from "@/data/constants"
import Button from "@/components/common/button"
import Underline from "@/components/common/underline"
import { CarerShiftApplication } from "@/types/workers"
import { CardDropdown } from "@/components/common/CardDropdown"
import { useStore } from "@/store/store"
import { useShallow } from "zustand/react/shallow"


export function InProgressShiftRecord({ ShiftRecord }: any) {
    const { shiftId } = ShiftRecord;

    const { markShiftCompleted } = useStore(useShallow((state) => ({
        markShiftCompleted: state.markShiftCompleted,
    })));

    const options = [
        {
            label: "Mark As Completed",
            onClick: () => markShiftCompleted(ShiftRecord._id),
        },
    ];
    return (
        <Card className="shadow-none bg-transparent border-none p-0 cursor-pointer">
            <CardContent className="space-y-6 shadow-none bg-transparent p-0">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                        <DisplayAvatar name={shiftId.title} />
                    </h3>
                    <CardDropdown
                        options={options}
                        id={ShiftRecord._id}
                    />

                </div>

                <p className="text-gray-700 line-clamp-1">{shiftId.description}</p>

                <Badge
                    className="capitalize truncate"
                    style={{ backgroundColor: getStatusColor(ShiftRecord.status.toLowerCase()) }}
                >
                    {ShiftRecord.status}
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
                    <span className="font-medium text-gray-500 ml-2">Posted By:</span>
                    <span className="font-medium text-red-500 ml-2">{shiftId.providerId?.firstName} {shiftId.providerId?.lastName}</span>
                </div>
                <Underline />
                <div className="flex items-center gap-2">
                    <span className="font-normal text-sm text-gray-500">Date Applied</span>
                    <span className="font-normal text-sm text-gray-800">{moment(ShiftRecord.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</span>
                </div>
            </CardContent>
        </Card>
    )
}
