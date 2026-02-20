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
        <section className="w-full py-16 bg-transparent">
            <h2 className="text-3xl font-bold text-center text-[#0C287B] mb-8">How It Works</h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-5xl mx-auto">
                {steps.map((step, idx) => (
                    <div key={step.title} className="flex flex-col items-center text-center max-w-xs">
                        <div className="w-12 h-12 mb-3 flex items-center justify-center rounded-full bg-[#0C287B]/10 text-[#0C287B] font-bold text-xl">{idx + 1}</div>
                        <h3 className="font-semibold text-lg mb-1 text-[#0C287B]">{step.title}</h3>
                        <p className="text-[#0C287B] text-sm opacity-80">{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
