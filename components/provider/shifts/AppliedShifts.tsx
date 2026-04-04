import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import { Loader } from "@/components/common/loader";
import { NotFoundComponent } from "@/components/common/NotFoundComponent";
import { AppliedShiftsCard } from "../components/shifts/appliedShifts";
import GridLayout from "@/components/common/gridLayout";
import CardLayout from "@/components/common/cardLayout";
import CustomTable from "@/components/common/customTable";
import moment from "moment";
import { formatPrice } from "@/utility/util";
import { getStatusColor } from "@/data/constants";
import { useMemo, useState } from "react";
import { CarerMiniProfileType } from "@/types/provider";
import { ToggleLayout } from "@/components/common/toggleLayout";
import { CardDropdown } from "@/components/common/CardDropdown";
import CarerMiniProfile from "../components/shifts/carerMiniProfile";


export const AppliedShifts = () => {
    const { isfetchingById, shiftApplications, isMenuGrid } = useStore(useShallow((state) => ({
        isfetchingById: state.isLoading.isfetchingById,
        shiftApplications: state.applications,
        isMenuGrid: state.isMenuBarGrid
    })));
    const [isShowCarerMiniProfile, setIsShowCarerMiniProfile] = useState<{ show: boolean; carer: CarerMiniProfileType | null, applicationId: string }>({ show: false, carer: null, applicationId: "" });


    const handleRowClick = (row: any) => {
        // Implement navigation to application details page
        setIsShowCarerMiniProfile({ show: true, carer: row.carerId, applicationId: row._id });
    }

    const options = [
        { label: "Approve", onClick: () => alert(`Approve application with ID:`) },
        { label: "Reject", onClick: () => alert(`Reject application with ID:`) },
    ];

    const columns = useMemo(() => [
        {
            accessorKey: "carerId",
            header: () => "Carer Name",
            cell: (info: any) => {
                const carer = info.row.carerId;
                const name = carer ? `${carer.firstName ?? ""} ${carer.lastName ?? ""}`.trim() : "Unknown";
                return <span>{name || "Unknown"}</span>;
            },
        },
        {
            accessorKey: "status",
            header: () => "Status",
            cell: (info: any) => <span className="py-1 px-2 text-white rounded-md" style={{ backgroundColor: getStatusColor(info.value.toLowerCase()) }}>{info.value}</span>,
        },
        {
            accessorKey: "createdAt",
            header: () => "Date Applied",
            cell: (info: any) => <span>{moment(info.value).format("MMMM Do YYYY")}</span>,
        },
        {
            accessorKey: "options",
            header: "Actions",
            cell: ({ row }: any) =>
                options ? (
                    <span
                        onClick={e => e.stopPropagation()} // Prevent row click
                    >
                        <CardDropdown options={options} id={row._id} />
                    </span>
                ) : null,
        }
    ], []);

    return (
        isfetchingById ? (
            <Loader />
        ) : shiftApplications.length === 0 ? (
            <NotFoundComponent title="No Applications Found" subTitle="You have not applied for any shifts yet." />
        ) : (
            <>
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold text-gray-800">Applied Shifts</h2>
                        <ToggleLayout />
                    </div>
                </div>
                {isMenuGrid === "grid" ? (
                    <GridLayout>
                        {shiftApplications.map((application) => (
                            <CardLayout key={application.id}>
                                <AppliedShiftsCard {...application} />
                            </CardLayout>
                        ))}
                    </GridLayout>
                ) : (
                    <>
                        <CustomTable
                            data={shiftApplications}
                            columns={columns}
                            currentPage={1}
                            totalPages={5}
                            onPageChange={() => { }}
                            onRowClick={handleRowClick}
                        />
                        {isShowCarerMiniProfile.show && isShowCarerMiniProfile.carer && (
                            <CarerMiniProfile show={isShowCarerMiniProfile.show} carer={isShowCarerMiniProfile.carer} onHide={() => setIsShowCarerMiniProfile({ show: false, carer: null, applicationId: "" })} header={`${isShowCarerMiniProfile.carer.firstName} ${isShowCarerMiniProfile.carer.lastName}`} applicationId={isShowCarerMiniProfile.applicationId} />
                        )}
                    </>
                )}
            </>
        )
    );
}