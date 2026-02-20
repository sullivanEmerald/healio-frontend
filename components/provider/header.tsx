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


const menuItems = [
    {
        label: "Profile",
        icon: User,
    },
    {
        label: "Settings",
        icon: Settings,
    },
    {
        label: "Help",
        icon: HelpCircle,
    },
    {
        label: "Payments",
        icon: CreditCard,
    },
    {
        label: "Logout",
        icon: LogOut,
    },
];



export default function ProviderHeader() {
    // Example user and wallet data (replace with real data as needed)
    const userName = "Sullivan Amadike";
    const walletBalance = 1200.5;

    const handleAddFunds = () => {
        // Implement add funds logic/modal here
        alert("Add funds clicked!");
    };

    return (
        <header className="w-full flex items-center justify-between bg-white shadow px-4 py-3 sticky top-0 z-50">
            <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-[#0C287B] tracking-tight">Hello, {userName}</span>
            </div>


            <div className="flex items-center gap-6">
                <div className="flex items-center bg-gray-100 rounded px-3 py-1">
                    <span className="text-gray-700 font-medium mr-2">Wallet:</span>
                    <span className="text-green-600 font-bold">{walletBalance.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}</span>
                    <button
                        className="ml-2 p-1 rounded-full text-white transition bg-[#0C287B]"
                        onClick={handleAddFunds}
                        title="Add Funds"
                    >
                        <FaPlus size={16} className="text-white" />
                    </button>
                </div>
                <button className="relative p-2 rounded-full hover:bg-gray-200 transition" title="Notifications">
                    <FaBell size={20} className="text-gray-500" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <Popover>
                    <PopoverTrigger asChild>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <Avatar name={userName} size="36" round={true} />
                            <span className="hidden md:inline text-gray-700 font-medium">{userName}</span>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverHeader>
                            <PopoverTitle>Account menu</PopoverTitle>
                        </PopoverHeader>
                        <div>
                            {menuItems.map(({ label, icon: Icon }, index) => (
                                <div key={label}>
                                    <div className="flex items-center gap-3 py-3 cursor-pointer hover:bg-gray-100 transition">
                                        <Icon size={18} className="text-[#0C287B]" />
                                        <span className="text-sm font-medium text-gray-700">
                                            {label}
                                        </span>
                                    </div>

                                    {index !== menuItems.length - 1 && (
                                        <hr className="border-gray-200 mx-4" />
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