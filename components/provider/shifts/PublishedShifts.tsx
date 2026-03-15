import { useStore } from "@/store/store";
import { useMemo } from "react";
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

export default function PublishedShifts() {
    const { shifts, isLoading, isMenuBarGrid } = useStore(useShallow((state) => ({
        shifts: state.shifts,
        isLoading: state.isLoading,
        isMenuBarGrid: state.isMenuBarGrid,
    })));

    const publishedShifts = useMemo(() => {
        return shifts.filter(shift => shift.status === "published");
    }, [shifts]);


    const columns = useMemo(() => [
        {
            accessorKey: "title",
            header: () => "Title",
            cell: (info: any) => <span>{info.value}</span>,
        },
        {
            accessorKey: "status",
            header: () => "Status",
            cell: (info: any) => <span className="py-1 px-2 text-white rounded-md" style={{ backgroundColor: getStatusColor(info.value.toLowerCase()) }}>{info.value}</span>,
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
            cell: (info: any) => <span>{formatPrice(info.value)}</span>,
        },
        {
            accessorKey: "startDate",
            header: () => "Start Date",
            cell: (info: any) => <span>{moment(info.value).format("MMMM Do YYYY")}</span>,
        },
        {
            accessorKey: "endDate",
            header: () => "End Date",
            cell: (info: any) => <span>{moment(info.value).format("MMMM Do YYYY")}</span>,
        },
    ], []);

    const publishOptions = [
        { label: "View", onClick: () => alert("View details for shift with ID:") },
        { label: "Edit", onClick: () => alert("Edit shift with ID:") },
        { label: "Unpublish", onClick: () => alert("Unpublish shift with ID:") },
        { label: "Delete", onClick: () => alert("Delete shift with ID:") },
    ];

    return (
        <div>
            <ProviderHeader title="Published Shifts" />
            {isLoading ? (
                <Loader />
            ) : publishedShifts.length === 0 ? (
                <NotFoundComponent
                    title="No Published Shifts Found"
                    subTitle="It seems you don't have any published shifts at the moment."
                    buttonText="Create Shift"
                    onButtonClick={() => console.log("Create Shift")}
                />
            ) : (
                <>
                    {isMenuBarGrid === "grid" ? (
                        <GridLayout>
                            {publishedShifts.map(shift => (
                                <CardLayout key={shift.id}>
                                    <ServiceRequestCard {...shift} options={publishOptions} />
                                </CardLayout>
                            ))}
                        </GridLayout>
                    ) : (
                        <CustomTable
                            data={publishedShifts}
                            columns={columns}
                            currentPage={1}
                            totalPages={5}
                            onPageChange={() => { }}
                            onRowClick={(row) => console.log("Clicked row with ID:", row)}
                        />
                    )}
                </>
            )}
        </div>
    );
}