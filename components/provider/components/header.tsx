import { ToggleLayout } from "@/components/common/toggleLayout";

export default function ProviderHeader({ title, showToggleButtons = true }: { title: string, showToggleButtons?: boolean }) {
    return (
        <div className="flex align-items-center justify-between mb-4">
            <h2 className="text-2xl font-medium text-gray-700">{title}</h2>
            {showToggleButtons && <ToggleLayout />}
        </div>
    );
}