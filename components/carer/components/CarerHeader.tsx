import { ToggleLayout } from "@/components/common/toggleLayout";
import Underline from "@/components/common/underline";

export default function CarerHeader({ title }: { title: string }) {
    return (
        <>
            <div className="flex align-items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-primary">{title}</h2>
                <ToggleLayout />

            </div>
            <Underline />
        </>
    );
}