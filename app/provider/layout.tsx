"use client"
import { PROVIDERS_MAIN_NAV } from "@/data/constants";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/sideBar";
import ProviderHeader from "@/components/provider/header";


export default function DashboardNav({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isProfile = pathname.includes("profile");
    const isSettings = pathname.includes("settings");

    return (
        <div className="flex flex-col sm:flex-row min-h-screen">
            <Sidebar items={PROVIDERS_MAIN_NAV} role='provider' />
            <main className="flex-1 overflow-y-auto space-y-6">
                <ProviderHeader />
                <div className="max-w-[1400px] mx-auto px-4 ">
                    {children}
                </div>
            </main>
        </div>
    );
}