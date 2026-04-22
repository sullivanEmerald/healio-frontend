"use client";
import { DashboardOverview } from "@/types/provider";
import { getStatusColor, getIcon } from "@/data/constants";


export default function DashboardStatus({ statusKey, value, title }: { statusKey: string, value: number, title: string }) {
    // alert(statusKey);
    const Icon = getIcon(statusKey);
    const color = getStatusColor(statusKey);
    return (
        <div
            className="flex items-center gap-6 rounded-2xl px-6 py-8 shadow-md hover:shadow-lg transition min-h-[150px]"
            style={{ backgroundColor: color }}
        >
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/20">
                <Icon size={26} className="text-white" />
            </div>

            <div className="text-white">
                <p className="text-sm opacity-80 mb-1">
                    {title}
                </p>
                <p className="text-3xl font-bold">
                    {value}
                </p>
            </div>
        </div>
    );
}


