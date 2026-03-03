import { Briefcase, Users, BarChart2, CreditCard, MessageCircle, User, Building2, FileText, Settings, Store, Loader, CheckCircle, Clock, Send, UserCheck, BadgeCheck, Wallet, HelpCircle } from "lucide-react";

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



// Workers Section

export const WORKERS_MAIN_NAV = [
    {
        to: "/worker/dashboard",
        icon: Briefcase,
        label: "Dashboard",
        paths: [],
    },
    {
        to: "/worker/marketplace",
        icon: Store,
        label: "Marketplace",
        paths: [],
    },
    {
        to: "/worker/my-services",
        icon: Store,
        label: "My Services",
        paths: [],
    },
    {
        to: "/worker/analytics",
        icon: BarChart2,
        label: "Analytics",
        paths: [],
    },
    {
        to: "/worker/payouts",
        icon: CreditCard,
        label: "Payouts & Earnings",
        paths: [],
    },
    {
        to: "/worker/support",
        icon: MessageCircle,
        label: "Support",
        paths: [
            '/worker/support/suggestions'
        ],
    },
];

export const WORKERS_PROFILE_NAV = [
    {
        label: "Personal Information",
        icon: User,
        to: "/worker/profile/personal-information",
        paths: [
            '/worker/support/suggestions'
        ],
    },
    {
        label: "Payment Management",
        icon: CreditCard,
        to: "/worker/profile/payment-management",
        paths: [
            '/worker/support/suggestions'
        ],
    },
    {
        label: "User Management",
        icon: Users,
        to: "/worker/profile/user-management",
        paths: [
            '/worker/support/suggestions'
        ],
    },
    {
        label: "Company Settings",
        icon: Building2,
        to: "/worker/profile/company-settings",
        paths: [
            '/worker/support/suggestions'
        ],
    },
    {
        label: "Additional Background",
        icon: FileText,
        to: "/worker/profile/additional-background",
        paths: [
            '/worker/support/suggestions'
        ],
    },
];

export const WORKERS_SETTINGS_NAV = [
    {
        icon: Settings,
        label: "Account Settings",
        to: "/worker/settings",
        paths: [
            '/worker/support/suggestions'
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
        case "applied":
            return "#B91C1C";
        case "paid":
            return "#0F766E";
        case "totalEarnings":
            return "#7C3AED";
        case "directInvitations":
            return "#B91C1C";
        case "assigned":
            return "#7C3AED";
        default:
            return "#6B7280";
    }
};

export const getIcon = (status: string) => {
    switch (status) {
        case "pending":
            return Clock;
        case "published":
            return Users;
        case "inProgress":
            return Briefcase;
        case "completed":
            return CheckCircle;
        case "assigned":
            return UserCheck;
        case "workers":
            return Users;
        case "approved":
            return BadgeCheck;
        case "applied":
            return FileText;
        case "paid":
            return CreditCard;
        case "totalEarnings":
            return Wallet;
        case "directInvitations":
            return Send;
        default:
            return HelpCircle;
    }
}

export const getAccountTypeDisplay = (type: string | null) => {
    if (!type) return '';
    const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
    return capitalizedType;
}


export const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const timeFormatRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
export const urlRegex =
    /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,6})?(\/[\w\d-._~:/?#[\]@!$&'()*+,;=]*)?$/i;
export const validNamePattern = /^[A-Za-z0-9\s]+$/;
export const phonePattern = /^\+?[0-9\s\-()]{7,20}$/;

export const validatePassword = (password: any) => {
    if (!password) {
        return "Password is required";
    }
    if (password.length < 8) {
        return "Your password is not strong enough. Use at least 8 characters";
    }
    if (!/[0-9]/.test(password)) {
        return "Use at least 1 digit";
    }
    if (!/[A-Z]/.test(password)) {
        return "Use at least 1 Uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
        return "Use at least 1 Lowercase letter";
    }
    return "";
};