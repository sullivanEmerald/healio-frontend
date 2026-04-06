import { useStore } from "@/store/store";
import { useMemo, useState } from "react";
import { ServiceRequestCard } from "../serviceReuest";
import GridLayout from "@/components/common/gridLayout";
import CardLayout from "@/components/common/cardLayout";
import { Loader } from "@/components/common/loader";
import { NotFoundComponent } from "@/components/common/NotFoundComponent";
import { useShallow } from "zustand/react/shallow";
import ProviderHeader from "../components/header";
import CustomTable from "@/components/common/customTable";
import moment from "moment";
import { formatPrice } from "@/utility/util";
import { getStatusColor } from "@/data/constants";
import { CardDropdown } from "@/components/common/CardDropdown";
import WorkerProfile from "../workerProfile";
import { AssignedRequestCard } from "../components/shifts/assignedRequest";
import { useShiftStatus } from "@/hooks/shiftStatus";




export default function AssignedShifts({ shiftStatus }: { shiftStatus: string }) {
    const { shifts, isLoading, isMenuBarGrid } = useStore(useShallow((state) => ({
        shifts: state.assignedShifts,
        isLoading: state.isLoading.fetching,
        isMenuBarGrid: state.isMenuBarGrid,
    })));

    const { assignedShifts } = useShiftStatus();

    const assignOptions = [
        { label: "View", href: `/provider/dashboard/shifts/` },
        { label: "Edit", onClick: () => alert(`Edit shift with ID:`) },
        { label: "Unassign", onClick: () => alert(`Unassign shift with ID:`) },
        { label: "Delete", onClick: () => alert(`Delete shift with ID:`) },
    ];



    const columns = useMemo(() => [
        {
            accessorKey: "shiftId",
            header: () => "Title",
            cell: (info: any) => {
                const shift = info.value;
                return <span>{shift ? shift.title : "Unknown"}</span>;
            }
        },
        {
            accessorKey: "status",
            header: () => "Status",
            cell: (info: any) => <span className="py-1 px-2 text-white rounded-md" style={{ backgroundColor: getStatusColor(info.value.toLowerCase()) }}>{info.value}</span>,
        },

        {
            accessorKey: "carerId",
            header: () => "Assigned Carer",
            cell: ({ row }) => {
                const carer = row.carerId;
                const name = carer ? `${carer.firstName ?? ""} ${carer.lastName ?? ""}`.trim() : "Unknown";
                return <span className="text-red-500">{name || "Unknown"}</span>;
            },
        },
        {
            accessorKey: "shiftId",
            header: () => "Description",
            cell: (info: any) => {
                const fewWords = info.value.description.split(" ").slice(0, 5).join(" ");
                return (
                    <span>
                        {fewWords}
                        {info.value.description.split(" ").length > 5 && "..."}
                    </span>
                );
            },
        },
        {
            accessorKey: "shiftId.amount",
            header: () => "Budget",
            cell: (info: any) => <span>{formatPrice(info.value)}</span>,
        },
        {
            accessorKey: "shiftId.startDate",
            header: () => "Start Date",
            cell: (info: any) => <span>{moment(info.value).format("MMMM Do YYYY")}</span>,
        },
        {
            accessorKey: "shiftId.endDate",
            header: () => "End Date",
            cell: (info: any) => <span>{moment(info.value).format("MMMM Do YYYY")}</span>,
        },
        // {
        //     accessorKey: "options",
        //     header: "Actions",
        //     cell: ({ row }: any) => assignOptions ? <CardDropdown options={assignOptions} id={row._id} /> : null,
        // }
    ], []);

    const handleRowClick = (row: any) => {
        console.log("Clicked row with ID:", row._id);
        // You can navigate to a details page or open a modal here
    }

    return (
        <div>
            <ProviderHeader title="Assigned Shifts" />
            {isLoading ? (
                <Loader />
            ) : assignedShifts.length === 0 ? (
                <NotFoundComponent
                    title={`No ${shiftStatus} Shifts Found`}
                    subTitle={`It seems you don't have any ${shiftStatus} shifts at the moment.`}
                    buttonText="Create Shift"
                    onButtonClick={() => console.log("Create Shift")}
                />
            ) : (
                <>
                    {isMenuBarGrid === "grid" ? (
                        <GridLayout>
                            {assignedShifts.map(shift => (
                                <CardLayout key={shift._id}>
                                    <AssignedRequestCard {...shift} options={assignOptions} />
                                </CardLayout>
                            ))}
                        </GridLayout>
                    ) : (
                        <CustomTable
                            data={assignedShifts}
                            columns={columns}
                            currentPage={1}
                            totalPages={5}
                            onPageChange={() => { }}
                            onRowClick={handleRowClick}
                        />
                    )}
                </>
            )}
        </div>
    );
}