import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import moment from "moment"
import { formatPrice } from "@/utility/util"
import { CardDropdown } from "@/components/common/CardDropdown"
import DisplayAvatar from "@/components/common/avatar"
import { getStatusColor } from "@/data/constants"
import Button from "@/components/common/button"
import CustomDrawer from "@/components/common/drawer"
import { useState } from "react";
import CarerMiniProfile from "./carerMiniProfile"
import { CarerMiniProfileType } from "@/types/provider";


interface AppliedShiftsCardProps {
    name: string,
    status: string,
    createdAt: string,
    _id: string;
    carerId: CarerMiniProfileType;
    options?: Array<{ label: string; onClick?: () => void; href?: string }>;
}


export function AppliedShiftsCard({
    name,
    carerId,
    status,
    createdAt,
    options,
    _id
}: AppliedShiftsCardProps) {
    const [isShowCarerProfile, setIsShowCarerProfile] = useState(false);
    const publishOptions = [
        { label: "Approve", onClick: () => alert(`Approve shift with ID: ${_id}`) },
        { label: "Reject", onClick: () => alert(`Reject shift with ID: ${_id}`) },
    ];

    return (
        <>
            <Card className="shadow-none bg-transparent border-none p-0 cursor-pointer">
                <CardContent className="space-y-6 shadow-none bg-transparent p-0">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                            <DisplayAvatar name={`${carerId.firstName} ${carerId.lastName}`} />
                        </h3>

                        {/* Dropdown   */}
                        <CardDropdown
                            options={publishOptions}
                            id={_id}
                        />
                    </div>
                    <Badge
                        className="capitalize truncate"
                        style={{ backgroundColor: getStatusColor(status.toLowerCase()) }}
                    >
                        {status}
                    </Badge>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-gray-500">Date Applied</p>
                            <p className="font-medium text-gray-800">{moment(createdAt).fromNow()}</p>
                        </div>
                    </div>

                    <Button className="w-full" onClick={() => setIsShowCarerProfile(true)}>
                        View Carer
                    </Button>
                </CardContent>
            </Card>
            {isShowCarerProfile && <CarerMiniProfile show={isShowCarerProfile} onHide={() => setIsShowCarerProfile(false)} header={`${carerId.firstName} ${carerId.lastName}'s Profile`} carer={carerId} applicationId={_id} />}

        </>
    )
}
