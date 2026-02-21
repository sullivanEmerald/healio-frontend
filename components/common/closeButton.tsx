import { X } from "lucide-react";
export default function CloseButton({ onClick }: { onClick: () => void }) {
    return (
        <button onClick={onClick} className="p-1 rounded-full hover:bg-white bg-white transition absolute top-4 right-4 cursor-pointer">
            <X className="w-4 h-4 text-primary" />
        </button>
    );
}