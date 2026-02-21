import { Briefcase, Users, BarChart2, CreditCard, MessageCircle, User, Building2, FileText, Settings } from "lucide-react";

export const PROVIDERS_MAIN_NAV = [
    {
        to: "/provider/dashboard",
        icon: Briefcase,
        label: "Dashboard",
        paths: [],
    },
    {
        to: "/provider/dashboard/services",
        icon: Briefcase,
        label: "My Services",
        paths: [],
    },
    {
        to: "/provider/dashboard/workers",
        icon: Users,
        label: "Workers Pool",
        paths: ["/provider/workers"],
    },
    {
        to: "/provider/analytics",
        icon: BarChart2,
        label: "Analytics",
        paths: [],
    },
    {
        to: "/provider/payments",
        icon: CreditCard,
        label: "Payments",
        paths: [],
    },
    {
        to: "/provider/support",
        icon: MessageCircle,
        label: "Support",
        paths: [
            '/provider/support/suggestions'
        ],
    },
];


export const PROVIDERS_PROFILE_NAV = [
    {
        label: "Personal Information",
        icon: User,
        to: "/provider/profile/personal-information",
        paths: [
            '/provider/support/suggestions'
        ],
    },
    {
        label: "Payment Management",
        icon: CreditCard,
        to: "/provider/profile/payment-management",
        paths: [
            '/provider/support/suggestions'
        ],
    },
    {
        label: "User Management",
        icon: Users,
        to: "/provider/profile/user-management",
        paths: [
            '/provider/support/suggestions'
        ],
    },
    {
        label: "Company Settings",
        icon: Building2,
        to: "/provider/profile/company-settings",
        paths: [
            '/provider/support/suggestions'
        ],
    },
    {
        label: "Additional Background",
        icon: FileText,
        to: "/provider/profile/additional-background",
        paths: [
            '/provider/support/suggestions'
        ],
    },
];


export const PROVIDER_SETTINGS_NAV = [
    {
        icon: Settings,
        label: "Account Settings",
        to: "/provider/settings",
        paths: [
            '/provider/support/suggestions'
        ],
    },
];


export const getStatusColor = (status: string) => {
    switch (status) {
        case "pending":
            return "#140f30";

        case "published":
            return "#F2720C";

        case "inProgress":
            return "#600D07";

        case "completed":
            return "#1C4C2D";

        case "assigned":
            return "#224074";
        case "workers":
            return '#FCB404';
        case "approved":
            return "#2E7D32";

        case "paid":
            return "#0F766E";

        default:
            return "#6B7280";
    }
};
