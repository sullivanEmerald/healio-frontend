"use client";
import { type ReactElement } from 'react';
import {
    ClipboardList,
    UserCheck,
    UserPlus,
    Clock,
    CreditCard,
    ShieldCheck
} from 'lucide-react';

interface HowItWorkItem {
    title: string;
    description: string;
    icon: ReactElement;
}


const howItWorkItems: HowItWorkItem[] = [
    {
        title: 'Post Jobs Effortlessly',
        description: 'Easily create and manage work orders in just a few clicks.',
        icon: <ClipboardList className="text-white text-2xl" />,
    },
    {
        title: 'Find the Right Talent',
        description: 'Use advanced search to quickly find qualified contractors.',
        icon: <UserCheck className="text-white text-2xl" />,
    },
    {
        title: 'Automate Onboarding',
        description: 'Streamline the process for faster, error-free onboarding.',
        icon: <UserPlus className="text-white text-2xl" />,
    },
    {
        title: 'Manage Work in Real-Time',
        description: 'Track the progress of all your work orders from start to finish.',
        icon: <Clock className="text-white text-2xl" />,
    },
    {
        title: 'Fast & Reliable Payments',
        description: 'Ensure prompt payments with automated processing once jobs are completed.',
        icon: <CreditCard className="text-white text-2xl" />,
    },
    {
        title: 'Stay Compliant',
        description: 'Keep your business compliant with built-in regulatory features.',
        icon: <ShieldCheck className="text-white text-2xl" />,
    },
];

export default function FeaturesSection() {
    return (
        <section id="tools" className="w-full py-12">
            <div className="text-center mb-12 max-w-3xl mx-auto">
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-snug">
                    Simple <span className="text-secondary">Tools</span> for{' '}
                    <span className="text-primary">Better Results</span>
                </h2>
                <p className="mt-2 text-base sm:text-lg text-gray-600">
                    Healio is designed to help Individuals and providers.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {howItWorkItems.map((item, index) => (
                    <div
                        key={index}
                        className="bg-custom-background/10 border border-gray-700 shadow-md rounded-xl p-6 text-center hover:shadow-lg transition"
                    >
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                                {item.icon}
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold text-white ">{item.title}</h3>
                        <p className="mt-2 text-sm text-gray-500">{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
