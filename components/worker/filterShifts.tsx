import Button from "../common/button";
import CustomDrawer from "../common/drawer";
import Input from "../common/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { DatePicker } from "../ui/datePicker";
import { Label } from "../ui/label";

function FilterShifts({ show, onClose, header }: { show: boolean; onClose: () => void; header: string }) {
    return (
        <CustomDrawer show={show} onHide={onClose} header={header}>
            <div className="w-full p-4 space-y-4">
                {/* Location as text input */}
                <Input placeholder="Enter location" />

                {/* Payment Frequency as select */}
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select payment frequency" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Hourly">Hourly</SelectItem>
                        <SelectItem value="Weekly">Weekly</SelectItem>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                    </SelectContent>
                </Select>

                {/* Status as select */}
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                </Select>

                {/* Shift Type as select */}
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select shift type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Day">Day</SelectItem>
                        <SelectItem value="Night">Night</SelectItem>
                        <SelectItem value="Live-in">Live-in</SelectItem>
                    </SelectContent>
                </Select>
                <div>
                    <Label className="block text-sm font-medium text-primary mb-1">Start Date</Label>
                    <DatePicker
                    // date={form.endDate}
                    // onChange={(date: any) => date && setForm({ ...form, endDate: date })}
                    />
                    {/* {errors.endDate && <span className="text-xs text-red-500 mt-1 block">{errors.endDate}</span>} */}
                </div>

                <div>
                    <Label className="block text-sm font-medium text-primary mb-1">End Date</Label>
                    <DatePicker
                    // date={form.endDate}
                    // onChange={(date: any) => date && setForm({ ...form, endDate: date })}
                    />
                    {/* {errors.endDate && <span className="text-xs text-red-500 mt-1 block">{errors.endDate}</span>} */}
                </div>


                {/* Add more selects/inputs as needed for other fields */}

                <Button>Cancel</Button>
                <Button>Apply</Button>
            </div>
        </CustomDrawer>
    );
}

export { FilterShifts };