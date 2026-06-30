"use client";
import Image from 'next/image';
import ProviderImage from '@/public/images/carers.png';
import { CalendarCheck, RefreshCcw, ShieldCheck } from 'lucide-react';

const features = [
    {
        title: 'Effortless Shift Management',
        description:
            'Create and assign shifts to contractors, and track progress in real time. Whether for remote or onsite projects, you can manage multiple shifts and make data-driven decisions to proactively address issues before they escalate.',
    },
    {
        title: 'Real-Time Updates on Shift Status',
        description:
            'Stay informed with real-time updates on shift status, allowing you to monitor progress and make informed decisions. Whether it’s a last-minute change or an unexpected issue, you can quickly adapt and ensure smooth operations.',
    },
    {
        title: 'Seamless Payments & Compliance',
        description:
            'Minimize legal risk and enhance your reputation with built-in compliance management. Enjoy transparent, instant payouts that optimize cash flow and eliminate administrative clutter.',
    },
];

export default function AboutUs() {
    return (
        <section className='py-8 space-y-10'>
            <div className='text-center w-full max-w-[900px] mx-auto '>
                <h2 className='text-3xl font-bold text-primary mb-4'>About Us</h2>
                <p className='text-lg text-secondary mb-6'>
                    At Healio, we are dedicated to revolutionizing the healthcare industry by connecting skilled professionals with healthcare providers in need. Our platform offers a seamless experience for both carers and providers, ensuring that quality care is delivered efficiently and effectively.
                </p>
                <p className='text-lg text-secondary'>
                    We believe in the power of technology to transform healthcare, and our mission is to create a more accessible and responsive healthcare system. Whether you're a carer looking for flexible work opportunities or a provider seeking reliable staffing solutions, Healio is here to support you every step of the way.
                </p>
            </div>
            <div className='flex flex-col md:flex-row items-start justify-between gap-4 w-full'>
                <div className="w-full md:max-w-[500px] lg:max-w-[500px] md:mx-0 shadow-lg rounded-lg flex-shrink-0 border h-auto md:h-[585px]">
                    <Image
                        src={ProviderImage}
                        alt="Provider Image"
                        layout="responsive"
                        priority
                        width={400}
                        height={400}
                        className="object-contain w-full h-auto rounded-lg"
                    />
                </div>
                {/* <div className="flex-1 flex flex-col gap-4 w-full md:max-w-[600px]">
                    {features.map((feature, idx) => (
                        <div key={feature.title} className="flex flex-col items-center md:items-start text-center md:text-left p-4 bg-white rounded-lg shadow-md h-full hover:shadow-lg transition-shadow duration-300">
                            {idx === 0 && <CalendarCheck size={36} className="text-primary mb-2 mx-auto" />}
                            {idx === 1 && <RefreshCcw size={36} className="text-primary mb-2 mx-auto" />}
                            {idx === 2 && <ShieldCheck size={36} className="text-primary mb-2 mx-auto" />}
                            <h3 className="text-xl font-semibold mb-2 mx-auto text-primary">{feature.title}</h3>
                            <p className="text-secondary text-base text-center">{feature.description}</p>
                        </div>
                    ))}
                </div> */}
            </div>
        </section>
    );
}