"use client";
import { Plus } from "lucide-react";
import Link from "next/link";
import Button from "../common/button";
import { useRouter } from "next/navigation";

export default function Overview({ title }: { title?: string }) {
    const router = useRouter();
    return (
        <>
            <div className="flex align-items-center justify-between">
                <p className="text-xl font-bold text-gray-700">{title || ""}</p>
                <Button onClick={() => router.push("/provider/dashboard/shifts/new")} className="flex items-center gap-2 w-auto">
                    <Plus size={25} className="text-white" />
                    <span className="text-md text-white">Create Shift</span>
                </Button>
            </div>
        </>
    );
}
