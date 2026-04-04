import { Briefcase, Users, BarChart2, CreditCard, MessageCircle, User, Building2, FileText, Settings, Store, Loader, CheckCircle, Clock, Send, UserCheck, BadgeCheck, Wallet, HelpCircle, Eye, Trash2, ArchiveX, X, Play } from "lucide-react";

export const PROVIDERS_MAIN_NAV = [
    {
        to: "/provider/dashboard",
        icon: Briefcase,
        label: "Dashboard",
        paths: [],
    },
    {
        to: "/provider/dashboard/shifts",
        icon: Briefcase,
        label: "My Shifts",
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
        to: "/carer/dashboard",
        icon: Briefcase,
        label: "Dashboard",
        paths: [],
    },
    {
        to: "/carer/marketplace",
        icon: Store,
        label: "Marketplace",
        paths: [],
    },
    {
        to: "/carer/my-services",
        icon: Store,
        label: "My Services",
        paths: [],
    },
    {
        to: "/carer/analytics",
        icon: BarChart2,
        label: "Analytics",
        paths: [],
    },
    {
        to: "/carer/payouts",
        icon: CreditCard,
        label: "Payouts & Earnings",
        paths: [],
    },
    {
        to: "/carer/support",
        icon: MessageCircle,
        label: "Support",
        paths: [
            '/carer/support/suggestions'
        ],
    },
];

export const WORKERS_PROFILE_NAV = [
    {
        label: "Personal Information",
        icon: User,
        to: "/carer/profile/personal-information",
        paths: [
            '/carer/support/suggestions'
        ],
    },
    {
        label: "Payment Management",
        icon: CreditCard,
        to: "/carer/profile/payment-management",
        paths: [
            '/carer/support/suggestions'
        ],
    },
    {
        label: "User Management",
        icon: Users,
        to: "/carer/profile/user-management",
        paths: [
            '/carer/support/suggestions'
        ],
    },
    {
        label: "Company Settings",
        icon: Building2,
        to: "/carer/profile/company-settings",
        paths: [
            '/carer/support/suggestions'
        ],
    },
    {
        label: "Additional Background",
        icon: FileText,
        to: "/carer/profile/additional-background",
        paths: [
            '/carer/support/suggestions'
        ],
    },
];

export const WORKERS_SETTINGS_NAV = [
    {
        icon: Settings,
        label: "Account Settings",
        to: "/carer/settings",
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

export const getIcon = (action: string) => {
    switch (action) {
        case "view":
            return Eye;
        case "publish":
            return Send;
        case "unpublish":
            return ArchiveX;
        case "edit":
            return FileText;
        case "delete":
            return Trash2;
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
        case "approve":
            return BadgeCheck;
        case "start":
            return Play;
        case "applied":
            return FileText;
        case "paid":
            return CreditCard;
        case "totalEarnings":
            return Wallet;
        case "directInvitations":
            return Send;
        case "reject":
            return X;
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