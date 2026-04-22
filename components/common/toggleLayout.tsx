"use client";
import { LayoutGrid, List } from "lucide-react";
import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";

function ToggleLayout() {
    const { toggleMenuBar } = useStore(
        useShallow((state) => ({
            toggleMenuBar: state.toggleMenuBar,
        }))
    );

    return (
        <div className="flex gap-2">
            <LayoutGrid className="cursor-pointer bg-gray-200 p-2 rounded w-8 h-8 text-primary" onClick={() => toggleMenuBar("grid")} />
            <List className="cursor-pointer bg-gray-200 p-2 rounded w-8 h-8 text-primary" onClick={() => toggleMenuBar("list")} />
        </div>
    );
}

export { ToggleLayout };
