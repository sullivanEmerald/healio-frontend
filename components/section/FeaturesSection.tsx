import React from 'react';

const features = [
    { title: 'Authentication', desc: 'Secure email signup, login, and password reset.' },
    { title: 'Profiles', desc: 'Worker and Provider profiles with ratings and compliance.' },
    { title: 'Shift Management', desc: 'Post, accept, and manage shifts with real-time updates.' },
    { title: 'Payments', desc: 'Marketplace payments and payouts via Stripe Connect.' },
    { title: 'Messaging', desc: 'Text-only, shift-linked messaging for coordination.' },
    { title: 'Ratings & Reviews', desc: 'Post-shift 1–5 star ratings and reviews.' },
    { title: 'Admin Dashboard', desc: 'Manage users, shifts, payments, and compliance.' },
];

export default function FeaturesSection() {
    return (
        <section className="w-full py-16 bg-transparent">
            <h2 className="text-3xl font-bold text-center text-[#0C287B] mb-8">Core Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {features.map((feature) => (
                    <div key={feature.title} className="bg-white rounded-xl shadow p-6 text-center border border-[#0C287B]/10">
                        <h3 className="font-semibold text-lg text-[#0C287B] mb-2">{feature.title}</h3>
                        <p className="text-[#0C287B] text-sm opacity-80">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
