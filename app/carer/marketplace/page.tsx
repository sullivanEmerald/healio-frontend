"use client";
import GridLayout from "@/components/common/gridLayout";
import ServiceRequests from "@/components/worker/MarketSeviceRequest";
import Input from "@/components/common/input";
import Underline from "@/components/common/underline";
import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useMemo, useState } from "react";
import { Loader } from "@/components/common/loader";
import { NotFoundComponent } from "@/components/common/NotFoundComponent";
import CarerHeader from "@/components/worker/components/CarerHeader";
import CustomTable from "@/components/common/customTable";
import moment from "moment";
import { formatPrice } from "@/utility/util";
import { Job } from "@/types/workers";
import WorkerProfile from "@/components/worker/serviceProfile";
import { FilterShifts } from "@/components/worker/filterShifts";

export default function MyWorkers() {

    const { gethMarketplaceShifts, availableShifts, isFetching, isMenuBarGrid } = useStore(useShallow((state) => ({
        gethMarketplaceShifts: state.gethMarketplaceShifts,
        isFetching: state.isFetching,
        availableShifts: state.availableShifts,
        isMenuBarGrid: state.isMenuBarGrid,
    })));
    const [selectedShift, setSelectedShift] = useState<Job | null>(null);
    const [showMiniProfile, setShowMiniProfile] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    useEffect(() => {
        gethMarketplaceShifts();
    }, [gethMarketplaceShifts]);

    const columns = useMemo(() => [
        {
            accessorKey: "title",
            header: () => "Title",
            cell: (info: any) => <span>{info.value}</span>,
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
        {
            accessorKey: "createdAt",
            header: () => "Posted On",
            cell: (info: any) => <span>{moment(info.value).fromNow()}</span>,
        },
        // {
        //     accessorKey: "options",
        //     header: "Actions",
        //     cell: ({ row }: any) => publishOptions ? <CardDropdown options={publishOptions} id={row._id} /> : null,
        // }
    ], []);


    const handleRowClick = (row: any) => {
        setSelectedShift(row);
        setShowMiniProfile(true);
    }

    return (
        <div className="">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-lg text-primary font-semibold">Marketplace For Available Shifts</h1>
                    <span className="text-gray-600">Find a suitable shift and be an early applicant</span>
                </div>
                <div className="w-full md:w-[300px]">
                    <Input
                        placeholder="Search for shifts by title, state, type or budget"
                        className="w-full border-gray-100 placeholder:text-sm"
                        disabled={isFetching || availableShifts.length === 0}
                    />
                </div>
            </div>
            <Underline />

            <CarerHeader title="Available Shifts" onFilterAction={() => setShowFilter(true)} />

            {isFetching ? (

                <Loader />

            ) : availableShifts.length === 0 ? (
                <NotFoundComponent title="No available shifts found" subTitle="Try adjusting your filters or check back later." />
            ) : (
                isMenuBarGrid === "grid" ? (
                    <GridLayout>
                        {availableShifts.map((shift) => (
                            <ServiceRequests key={shift._id} job={shift} />
                        ))}
                    </GridLayout>
                ) : (
                    <CustomTable
                        data={availableShifts}
                        columns={columns}
                        currentPage={1}
                        totalPages={5}
                        onPageChange={() => { }}
                        onRowClick={handleRowClick}
                    />
                ))}
            {showMiniProfile && selectedShift && (
                <WorkerProfile show={showMiniProfile} onHide={() => setShowMiniProfile(false)} job={selectedShift} />
            )}

            {showFilter && <FilterShifts onClose={() => setShowFilter(false)} show={showFilter} header="Filter Marketplace Shifts" />}
        </div>
    );
}