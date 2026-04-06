"use client"
import Avatar from "react-avatar";
import { FaBell, FaPlus } from "react-icons/fa";
import {
    Popover,
    PopoverContent,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    User,
    Settings,
    HelpCircle,
    CreditCard,
    LogOut
} from "lucide-react";
import Link from "next/link";
import DisplayAvatar from "@/components/common/avatar";
import { useAuth } from "@/hooks/userAuth";
import { getFirstName } from "@/utility/util";




type MenuItem = {
    label: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    to?: string;
};


const menuItems: MenuItem[] = [
    {
        label: "Profile",
        icon: User,
        to: "/provider/profile/personal-information",
    },
    {
        label: "Settings",
        icon: Settings,
        to: "/provider/settings",
    },
    {
        label: "Help",
        icon: HelpCircle,
        to: "/provider/help",
    },
    {
        label: "Payments",
        icon: CreditCard,
        to: "/provider/payments",
    },
    {
        label: "Logout",
        icon: LogOut,
    },
];



export default function ProviderHeader() {
    const { user, logout } = useAuth();
    const walletBalance = 1200.5;

    const handleAddFunds = () => {
        alert("Add funds clicked!");
    };

    return (
        <header className="w-full flex items-center justify-between shadow px-4 py-3 sticky border-b bg-background/80 backdrop-blur-md top-0 z-30 h-16">
            <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-primary tracking-tight">Hello, {getFirstName(user?.fullName)}</span>
            </div>
            <div className="flex items-center gap-6">
                {/* <div className="flex items-center bg-gray-100 rounded px-3 py-1">
                    <span className="text-gray-700 font-medium mr-2">Wallet:</span>
                    <span className="text-green-600 font-bold">{walletBalance.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}</span>
                    <button
                        className="ml-2 p-1 rounded-full text-white transition bg-primary hover:bg-primary/90"
                        onClick={handleAddFunds}
                        title="Add Funds"
                    >
                        <FaPlus size={16} className="text-white" />
                    </button>
                </div> */}
                <button className="relative p-2 rounded-full hover:bg-gray-200 transition focus:outline-none focus:ring-2 focus:ring-primary" title="Notifications">
                    <FaBell size={20} className="text-gray-500" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <Popover>
                    <PopoverTrigger asChild>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <DisplayAvatar name={user?.fullName} />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverHeader>
                            <PopoverTitle>Account menu</PopoverTitle>
                        </PopoverHeader>
                        <div>
                            {menuItems.map(({ label, icon: Icon, to }, index) => (
                                <div key={label}>
                                    {to ? (
                                        <>
                                            <Link href={to} className="flex items-center gap-3 py-3 cursor-pointer hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-primary">
                                                <Icon size={18} className="text-primary" />
                                                <span className="text-sm font-medium text-gray-700">
                                                    {label}
                                                </span>
                                            </Link>
                                            <hr className="border-gray-200 mx-4" />
                                        </>
                                    ) : (
                                        <button className="flex items-center gap-3 py-3 w-full cursor-pointer hover:bg-gray-100 transition border-none outline-none bg-transparent focus:outline-none focus:ring-2 focus:ring-primary" onClick={logout}>
                                            <Icon size={18} className="text-primary" />
                                            <span className="text-sm font-medium text-gray-700">
                                                {label}
                                            </span>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </header>
    );
}