import { MoreVertical } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Link from "next/link";
import React from "react";
import { getIcon } from "@/data/constants";
import { id } from "date-fns/locale/id";

interface CardDropdownProps {
    onUnpublish?: () => void;
    onModify?: () => void;
    modifyLink?: string;
    modifyState?: any;
    id: string;
    options?: Array<{ label: string; onClick?: () => void; href?: string }>;
}

export const CardDropdown: React.FC<CardDropdownProps> = ({
    onUnpublish,
    onModify,
    modifyLink = "#",
    modifyState,
    options,
    id
}) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none">
                    <MoreVertical className="w-5 h-5 text-gray-500" />
                </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-40 p-0">
                <ul className="divide-y divide-gray-200">
                    {options ? (
                        options.map((opt, idx) => {
                            const Icon = getIcon(opt.label.toLowerCase());
                            return opt.href ? (
                                <li key={idx}>
                                    <Link
                                        href={`${opt.href}${opt.href.includes("?") ? `&id=${id}` : `${id}`}`}
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                    >
                                        <Icon className="w-4 h-4" />
                                        {opt.label}
                                    </Link>
                                </li>
                            ) : (
                                <li key={idx}>
                                    <button
                                        onClick={opt.onClick}
                                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                    >
                                        <Icon className="w-4 h-4" />
                                        {opt.label}
                                    </button>
                                </li>
                            );
                        })
                    ) : (
                        <>
                            <li>
                                <Link
                                    href={modifyLink}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                    {...(modifyState ? { state: modifyState } : {})}
                                >
                                    Modify
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={onUnpublish}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                >
                                    Unpublish
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </PopoverContent>
        </Popover>
    );
};
