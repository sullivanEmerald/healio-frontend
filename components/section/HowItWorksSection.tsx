import {
    UserPlus,
    UserRoundCheck,
    CalendarPlus,
    ShieldCheck,
    Wallet,
} from "lucide-react";

const steps = [
    {
        title: "Sign Up",
        desc: "Create an account as a Care Provider or Worker.",
        icon: UserPlus,
    },
    {
        title: "Build Profile",
        desc: "Complete your profile and compliance status.",
        icon: UserRoundCheck,
    },
    {
        title: "Post/Accept Shifts",
        desc: "Providers post shifts, workers accept and lock in.",
        icon: CalendarPlus,
    },
    {
        title: "DBS Verification",
        desc: "DBS status declared and verified for compliance.",
        icon: ShieldCheck,
    },
    {
        title: "Get Paid",
        desc: "Payments processed securely via Stripe Connect.",
        icon: Wallet,
    },
];

export default function HowItWorksSection() {
    return (
        <div className="flex flex-col gap-5">
            {steps.map((step) => {
                const Icon = step.icon;

                return (
                    <div
                        key={step.title}
                        className="flex items-start gap-4 rounded-xl border border-gray-200 bg-gray-750 p-4 shadow-sm"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <Icon className="h-6 w-6 text-primary" />
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg text-black">
                                {step.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {step.desc}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
