import Link from "next/link";
import { HealioLogo } from "./common/healioLogo";

interface SidebarItem {
    to: string;
    icon: React.ElementType;
    label: string;
    paths?: string[];
}

interface SidebarProps {
    items: SidebarItem[];
    role?: string;
}

export default function Sidebar({ items, role }: SidebarProps) {
    return (
        <nav
            className="w-64 h-full bg-white border-r flex flex-col px-4 shadow-sm fixed inset-y-0 left-0 z-40 hidden sm:flex"
            aria-label="Sidebar"
        >
            <HealioLogo />
            <ul className="flex-1 space-y-2">
                {items.map((item) => (
                    <li key={item.to}>
                        <Link href={item.to} className="flex items-center gap-3 px-4 py-3 rounded-lg text-primary font-medium hover:bg-primary/10 transition group focus:outline-none focus:ring-2 focus:ring-primary">
                            <div className="rounded-full bg-gray-700">
                                <item.icon className="w-6 h-6 text-white group-hover:text-white group-hover:bg-primary rounded p-1 transition" />
                            </div>
                            <span className="text-gray-700">{item.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
