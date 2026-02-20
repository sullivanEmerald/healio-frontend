import Link from "next/link";

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
        <nav className="w-full sm:w-64 bg-white border-r min-h-screen flex flex-col py-8 px-4 shadow-sm">
            <div className="mb-10 text-2xl font-extrabold text-[#0C287B] tracking-tight text-center">
                {role === 'provider' ? 'Provider' : 'Dashboard'}
            </div>
            <ul className="flex-1 space-y-2">
                {items.map((item) => (
                    <li key={item.to}>
                        <Link href={item.to} className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#0C287B] font-medium hover:bg-[#0C287B]/10 transition group">
                            <item.icon className="w-6 h-6 text-[#0C287B] group-hover:text-white group-hover:bg-[#0C287B] rounded p-1 transition" />
                            <span>{item.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
