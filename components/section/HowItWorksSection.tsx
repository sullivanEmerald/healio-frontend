"use client";
import Image from 'next/image';
import ProviderImage from '@/public/images/works.png';
import React from 'react';

const steps = [
    { title: 'Sign Up', desc: 'Create an account as a Care Provider or Worker.' },
    { title: 'Build Profile', desc: 'Complete your profile and compliance status.' },
    { title: 'Post/Accept Shifts', desc: 'Providers post shifts, workers accept and lock in.' },
    { title: 'DBS Verification', desc: 'DBS status declared and verified for compliance.' },
    { title: 'Get Paid', desc: 'Payments processed securely via Stripe Connect.' },
];

export default function HowItWorksSection() {
    return (
        <>
            <h2 className="text-3xl font-bold text-center text-primary mb-6 mt-10">How It Works</h2>
            <section className="w-full bg-transparent text-white flex flex-col md:flex-row items-center justify-between gap-12 mx-auto max-w-5xl mb-12">
                <div>
                    <div className="flex flex-col gap-4 max-w-5xl">
                        {steps.map((step, idx) => (
                            <div key={step.title} className="flex flex-row items-center text-black gap-3">
                                <div>
                                    <h3 className="font-semibold text-lg ">{step.title}</h3>
                                    <p className="text-sm opacity-80">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="max-w-[500px] w-full shadow-lg py-4 rounded-lg">
                    <Image
                        src={ProviderImage}
                        alt="Provider Image"
                        layout="responsive"
                        priority
                        width={700}
                        height={475}
                        className="object-contain w-full h-auto"
                    />
                </div>
            </section>
        </>
    );
}
