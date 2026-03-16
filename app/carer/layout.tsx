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
            <div className="flex flex-col sm:flex-row min-h-screen">
                <Sidebar items={activeNav} role='provider' />
                <main className="flex-1 overflow-y-auto space-y-6">
                    <ProviderHeader />
                    <div className="max-w-[1400px] mx-auto px-4 ">
                        {children}
                    </div>
                </main>
            </div>
        </RoleGuard>
    );
}