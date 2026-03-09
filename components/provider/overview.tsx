
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Overview({ title }: { title?: string }) {
    return (
        <>
            <div className="flex align-items-center justify-between">
                <p className="text-xl font-bold text-primary">{title || ""}</p>
                <Link href="/provider/dashboard/shifts/new" className="bg-primary p-2 flex items-center gap-1 rounded-xl">
                    <Plus size={25} className="text-white" />
                    <span className="text-md text-white">Create Shift</span>
                </Link>
            </div>
        </>
    );
}
