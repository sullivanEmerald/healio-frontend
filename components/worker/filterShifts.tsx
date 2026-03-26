import React, { useState } from "react";
import Button from "../common/button";
import CustomDrawer from "../common/drawer";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { DatePicker } from "../ui/datePicker";
import { Label } from "../ui/label";
import { State } from "country-state-city";
import { FilterState } from "@/app/carer/marketplace/page";

const ukStates = State.getStatesOfCountry("GB");


function FilterShifts({ show, onClose, header, onApply }: { show: boolean; onClose: () => void; header: string, onApply: (shiftFilter: FilterState) => void }) {
    const [filters, setFilters] = useState<FilterState>({
        state: "",
        startDate: undefined,
        endDate: undefined,
        paymentFrequency: "",
        shiftType: "",
        minRate: "",
        maxRate: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <CustomDrawer show={show} onHide={onClose} header={header}>
            <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto p-4 space-y-5">
                    {/* Location as text input */}
                    <div>
                        <Label htmlFor="state" className="block text-sm font-medium text-primary mb-1">State</Label>
                        <Select
                            value={filters.state}
                            onValueChange={(value) => setFilters((prev) => ({ ...prev, state: value }))}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                                {ukStates.map((state) => (
                                    <SelectItem key={state.isoCode} value={state.name}>
                                        {state.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label className="block text-sm font-medium text-primary mb-1">Start Date</Label>
                        <DatePicker
                            date={filters.startDate}
                            onChange={(date?: Date) => setFilters((prev) => ({ ...prev, startDate: date }))}
                        />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium text-primary mb-1">End Date</Label>
                        <DatePicker
                            date={filters.endDate}
                            onChange={(date?: Date) => setFilters((prev) => ({ ...prev, endDate: date }))}
                        />
                    </div>
                    <section className="flex flex-col md:flex-row gap-4">
                        <div>
                            <Label className="block text-sm font-medium text-primary mb-1">Payment Frequency</Label>
                            <Select
                                value={filters.paymentFrequency}
                                onValueChange={(value) => setFilters((prev) => ({ ...prev, paymentFrequency: value }))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select payment frequency" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Hourly">Hourly</SelectItem>
                                    <SelectItem value="Weekly">Weekly</SelectItem>
                                    <SelectItem value="Monthly">Monthly</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label className="block text-sm font-medium text-primary mb-1">Shift Type</Label>
                            <Select
                                value={filters.shiftType}
                                onValueChange={(value) => setFilters((prev) => ({ ...prev, shiftType: value }))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select shift type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Day">Day</SelectItem>
                                    <SelectItem value="Night">Night</SelectItem>
                                    <SelectItem value="Live-in">Live-in</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </section>
                    {/* Min/Max Rate */}
                    <div>
                        <Label className="block text-sm font-medium text-primary mb-1">Amount</Label>
                        <div className="flex gap-2 items-center">
                            <Input
                                type="number"
                                min={0}
                                placeholder="Min rate"
                                name="minRate"
                                value={filters.minRate}
                                onChange={handleChange}
                                className="w-1/2"
                            />
                            <span className="text-gray-400">-</span>
                            <Input
                                type="number"
                                min={0}
                                placeholder="Max rate"
                                name="maxRate"
                                value={filters.maxRate}
                                onChange={handleChange}
                                className="w-1/2"
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col md:flex-row items-center gap-2 p-4 bg-white">
                    <Button className="w-full md:w-1/2" onClick={onClose}>Cancel</Button>
                    <Button className="w-full md:w-1/2" onClick={() => onApply(filters)}>Apply</Button>
                </div>
            </div>
        </CustomDrawer>
    );
}

export { FilterShifts };