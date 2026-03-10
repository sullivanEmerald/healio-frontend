"use client";
import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';


interface FaqItem {
    title: string;
    description: string;
}

const faqItems: FaqItem[] = [
    {
        title: 'What is Healio?',
        description:
            'Healio is a healthcare staffing platform that connects care providers with qualified professionals, making it easy to create, manage, and fill shifts for organizations of any size.',
    },
    {
        title: 'How do I create a shift?',
        description: 'Simply log in as a provider, navigate to your dashboard, and use the "Create Shift" feature to specify your requirements, dates, and rates. Your shift will be visible to qualified carers instantly.',
    },
    {
        title: 'How are carers vetted?',
        description: 'All carers on Healio undergo background checks, right-to-work verification, and compliance screening to ensure only qualified professionals are matched to your shifts.',
    },
    {
        title: 'How quickly can a shift be filled?',
        description: 'Many shifts are filled within hours. Our platform notifies available carers in real time, so you can get cover fast—even for last-minute needs.',
    },
    {
        title: 'How does payment work?',
        description: 'Payments are processed securely through Healio. Carers are paid promptly after shift completion, and providers receive transparent invoices for all bookings.',
    },
    {
        title: 'Is my data secure?',
        description: 'Yes. Healio uses industry-standard encryption and strict privacy controls to keep your information safe and confidential.',
    },
    {
        title: 'Can I manage both remote and onsite shifts?',
        description: 'Absolutely. Healio supports both onsite and remote healthcare engagements, giving you flexibility to meet your staffing needs.',
    },
];

const Faq: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <section id="faqs" className="py-2 px-4 md:px-6 lg:px-8 bg-white text-primary mt-10">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl sm:text-4xl font-bold">Frequently Asked Questions</h2>
                    {/* <p className="text-gray-600 mt-2 text-base max-w-xl mx-auto">
            Get answers to common questions about how WorkRobin works for businesses and providers.
          </p> */}
                </div>

                {/* Accordion Items */}
                <div className="space-y-4">
                    {faqItems.map((item, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={index}
                                className={`border rounded-xl bg-white overflow-hidden transition-shadow ${isOpen ? 'shadow-md' : 'shadow-sm'
                                    }`}
                            >
                                <button
                                    onClick={() => handleToggle(index)}
                                    className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
                                    aria-expanded={isOpen}
                                >
                                    <span className="font-medium text-base sm:text-lg">{item.title}</span>
                                    <FaChevronDown
                                        className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                                            }`}
                                    />
                                </button>
                                {isOpen && (
                                    <div className="px-6 pb-4 text-sm sm:text-base text-gray-700">
                                        {item.description}
                                    </div>
                                )}

                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Faq;
