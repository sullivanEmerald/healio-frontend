import { Briefcase, Users, BarChart2, CreditCard, MessageCircle } from "lucide-react";

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
        title: "General",
        items: [
            { label: "Company Profile", to: "/profile/company" },
            {
                label: "Tax Information",
                to: "/profile/tax-information",
                paths: [
                    "/profile/tax-information/identity-verification",
                    "/profile/tax-information/information-protection",
                ],
            },
            { label: "Tax Documentation", to: "/profile/tax-documentation" },
        ],
    },
    {
        title: "Payment Management",
        items: [
            { label: "Payment Method", to: "/profile/payment-method" },
            { label: "Spending Limit", to: "/profile/spending-limit" },
        ],
    },
    {
        title: "User Management",
        items: [{ label: "Manage Members", to: "/profile/manage-members" }],
    },
    {
        title: "Company Settings",
        items: [
            { label: "Roles and Permissions", to: "/profile/roles-permissions" },
            { label: "Activity Log", to: "/profile/activity-log" },
            { label: "Integrations", to: "/profile/integrations" },
        ],
    },
    {
        title: "Addtional Background",
        items: [
            { label: "Screenings", to: "/profile/screenings" },
            { label: "Screenings Status", to: "/profile/screenings/status" },
        ],
    },
];


export const PROVIDER_SETTINGS_NAV = [
    {
        title: "Account Settings",
        items: [
            { label: "Notifications", to: "/settings/notifications" },
            { label: "Password", to: "/settings/password" },
            { label: "Security", to: "/settings/security" },
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
