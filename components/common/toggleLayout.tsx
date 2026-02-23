import { LayoutGrid, List } from "lucide-react";

function ToggleLayout() {
    return (
        <div className="flex gap-2">
            <LayoutGrid className="cursor-pointer bg-gray-200 p-2 rounded w-8 h-8 text-primary" />
            <List className="cursor-pointer bg-gray-200 p-2 rounded w-8 h-8 text-primary" />
        </div>
    );
}

export { ToggleLayout };
