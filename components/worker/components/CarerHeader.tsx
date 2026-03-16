import { ToggleLayout } from "@/components/common/toggleLayout";
import Underline from "@/components/common/underline";
import { Filter } from "lucide-react";

export default function CarerHeader({ title, onFilterAction }: { title: string, onFilterAction?: () => void }) {
    return (
        <>
            <div className="flex align-items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-primary">{title}</h2>
                <div className="flex items-center gap-2">
                    <ToggleLayout />
                    {onFilterAction && <Filter className="cursor-pointer bg-gray-200 p-2 rounded w-8 h-8 text-primary" onClick={onFilterAction} />}
                </div>
            </div>
            <Underline />
        </>
    );
}