"use client";
import Avatar from "react-avatar";
export default function DisplayAvatar({ name }: { name: string }) {
    return (
        <div className="flex items-center space-x-4">
            <Avatar name={name} size="36" round={true} />
            <span className="hidden md:inline text-gray-700 font-medium">{name}</span>
        </div>
    );
}
