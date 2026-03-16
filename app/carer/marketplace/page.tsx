"use client";
import GridLayout from "@/components/common/gridLayout";
import ServiceRequests from "@/components/carer/MarketSeviceRequest";
import Input from "@/components/common/input";
import Underline from "@/components/common/underline";
import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";
import { Loader } from "@/components/common/loader";
import { NotFoundComponent } from "@/components/common/NotFoundComponent";
import CarerHeader from "@/components/carer/components/CarerHeader";



export default function MyWorkers() {

    const { gethMarketplaceShifts, availableShifts, isFetching } = useStore(useShallow((state) => ({
        gethMarketplaceShifts: state.gethMarketplaceShifts,
        isFetching: state.isFetching,
        availableShifts: state.availableShifts,
    })));

    console.log('available marketplace shifts', availableShifts);

    useEffect(() => {
        gethMarketplaceShifts();
    }, [gethMarketplaceShifts]);

    return (
        <div className="">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold">Marketplace For Available Shifts</h1>
                    <span className="text-gray-600">Find a suitable shift and be an early applicant</span>
                </div>
                <div className="w-full md:w-[400px]">
                    <Input
                        placeholder="Search for shifts by title, state, type or budget"
                        className="w-full border border-gray-800 focus:border-primary focus:ring-primary rounded-lg px-4 py-2 text-primary placeholder:text-primary/60 bg-transparent"
                        disabled={isFetching || availableShifts.length === 0}
                    />
                </div>
            </div>
            <Underline />

            <CarerHeader title="Available Shifts" />

            {isFetching ? (

                <Loader />

            ) : availableShifts.length === 0 ? (
                <NotFoundComponent title="No available shifts found" subTitle="Try adjusting your filters or check back later." />
            ) : (
                <GridLayout>
                    {availableShifts.map((shift) => (
                        <ServiceRequests key={shift._id} job={shift} />

                    ))}
                </GridLayout>
            )}
        </div>
    );
}