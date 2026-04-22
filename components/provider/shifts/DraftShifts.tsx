
import { useStore } from "@/store/store";
import { useMemo } from "react";
import { ServiceRequestCard } from "../serviceReuest";
import GridLayout from "@/components/common/gridLayout";
import CardLayout from "@/components/common/cardLayout";
import { Loader } from "@/components/common/loader";
import { NotFoundComponent } from "@/components/common/NotFoundComponent";
import { useShallow } from "zustand/react/shallow";
import { useShiftStatus } from "@/hooks/shiftStatus";
import ProviderHeader from "../components/header";
import CustomTable from "@/components/common/customTable";
import moment from "moment";
import { formatPrice } from "@/utility/util";
import { getStatusColor } from "@/data/constants";
import { CardDropdown } from "@/components/common/CardDropdown";
import { DraftedShiftsCard } from "../components/shifts/draftedShifts";

export default function DraftShifts() {
    const { isLoading, isMenuBarGrid } = useStore(useShallow((state) => ({
        shifts: state.shifts,
        isLoading: state.isLoading.fetching,
        isMenuBarGrid: state.isMenuBarGrid,
    })));

    const { draftShifts } = useShiftStatus();


    const handleRowClick = (row: any) => {
        console.log("Row clicked:", row);
    }

    const draftOptions = [
        { label: "Edit", href: '/provider/dashboard/shifts/new?mode=draft' },
        { label: "Delete", onClick: () => alert(`Delete shift with ID:`) },
    ];

    const columns = useMemo(() => [
        {
            accessorKey: "title",
            header: () => "Title",
            cell: (info: any) => <span>{info.value || "-"}</span>,
        },
        {
            accessorKey: "status",
            header: () => "Status",
            cell: (info: any) => <span className="py-1 px-2 text-white rounded-md" style={{ backgroundColor: getStatusColor(info.value.toLowerCase()) }}>{info.value || "-"}</span>,
        },

        {
            accessorKey: "description",
            header: () => "Description",
            cell: (info: any) => {
                const fewWords = info.value.split(" ").slice(0, 5).join(" ");
                return (
                    <span>
                        {fewWords}
                        {info.value.split(" ").length > 5 && "..."}
                    </span>
                );
            },
        },
        {
            accessorKey: "hourlyRate",
            header: () => "Budget",
            cell: (info: any) => <span>{formatPrice(info.value) || "-"}</span>,
        },
        {
            accessorKey: "startDate",
            header: () => "Start Date",
            cell: (info: any) => <span>{moment(info.value).format("MMMM Do YYYY") || "-"}</span>,
        },
        {
            accessorKey: "endDate",
            header: () => "End Date",
            cell: (info: any) => <span>{moment(info.value).format("MMMM Do YYYY") || "-"}</span>,
        },
        {
            accessorKey: "options",
            header: "Actions",
            cell: ({ row }: any) => draftOptions ? <CardDropdown options={draftOptions} id={row._id} /> : null,
        }
    ], []);


    return (
        <div>
            <ProviderHeader title="Draft Shifts" />
            {isLoading ? (
                <Loader />
            ) : draftShifts.length === 0 ? (
                <NotFoundComponent
                    title="No Draft Shifts Found"
                    subTitle="It seems you don't have any draft shifts at the moment."
                    buttonText="Create Shift"
                    onButtonClick={() => console.log("Create Shift")}
                />
            ) : (
                <>
                    {isMenuBarGrid === "grid" ? (
                        <GridLayout>
                            {draftShifts.map(shift => (
                                <CardLayout key={shift._id}>
                                    <DraftedShiftsCard {...shift} options={draftOptions} />
                                </CardLayout>
                            ))}
                        </GridLayout>
                    ) : (
                        <CustomTable
                            data={draftShifts}
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