"use client"
import { PROVIDERS_MAIN_NAV, PROVIDERS_PROFILE_NAV, PROVIDER_SETTINGS_NAV } from "@/data/constants";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/sideBar";
import ProviderHeader from "@/components/provider/header";
import { useEffect, useState } from "react";
import { RoleGuard } from "@/components/guards/roleGuard";


export default function DashboardNav({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isProfile = pathname.includes("/profile");
    const isSettings = pathname.includes("/settings");
    const [activeNav, setActiveNav] = useState(PROVIDERS_MAIN_NAV);

    useEffect(() => {
        if (isProfile) {
            setActiveNav(PROVIDERS_PROFILE_NAV);
        } else if (isSettings) {
            setActiveNav(PROVIDER_SETTINGS_NAV);
        } else {
            setActiveNav(PROVIDERS_MAIN_NAV);
        }
    }, [pathname]);

    return (
        <RoleGuard role="provider">
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