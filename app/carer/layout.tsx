"use client"
import { WORKERS_MAIN_NAV, WORKERS_PROFILE_NAV, WORKERS_SETTINGS_NAV } from "@/data/constants";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/sideBar";
import ProviderHeader from "@/components/provider/header";
import { useEffect, useState } from "react";
import { RoleGuard } from "@/components/guards/roleGuard";


export default function DashboardNav({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isProfile = pathname.includes("/profile");
    const isSettings = pathname.includes("/settings");
    const [activeNav, setActiveNav] = useState(WORKERS_MAIN_NAV);

    useEffect(() => {
        if (isProfile) {
            setActiveNav(WORKERS_PROFILE_NAV);
        } else if (isSettings) {
            setActiveNav(WORKERS_SETTINGS_NAV);
        } else {
            setActiveNav(WORKERS_MAIN_NAV);
        }
    }, [pathname]);

    return (
        <RoleGuard role="carer">
            <div className="flex min-h-screen bg-gray-50">
                {/* Fixed sidebar for desktop, overlay for mobile */}
                <aside className="hidden sm:fixed sm:inset-y-0 sm:flex sm:w-64 z-40">
                    <Sidebar items={activeNav} role='provider' />
                </aside>
                {/* Overlay sidebar for mobile (optional, can add later) */}
                {/* Main content area */}
                <div className="flex-1 flex flex-col sm:ml-64 min-h-screen">
                    <ProviderHeader />
                    <main className="flex-1 overflow-y-auto pt-4 pb-8 px-4">
                        <div className="max-w-[1400px] mx-auto w-full">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </RoleGuard>
    );
}