import React from 'react';

export default function HeroSection() {
    return (
        <section className="w-full py-16 bg-transparent text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#0C287B] mb-4">Care Staffing, Simplified</h1>
            <p className="text-lg md:text-xl text-[#0C287B] mb-8 max-w-2xl mx-auto opacity-80">
                Healio connects care providers and workers with trust, compliance, and speed. Validate shifts, manage compliance, and get paid—all in one place.
            </p>
            <div className="flex justify-center gap-4">
                <a href="/signup" className="px-6 py-3 bg-[#0C287B] text-white rounded-lg font-semibold shadow hover:bg-[#183b9e] transition">Get Started</a>
                <a href="/login" className="px-6 py-3 border border-[#0C287B] text-[#0C287B] rounded-lg font-semibold hover:bg-[#0C287B]/10 transition">Login</a>
            </div>
        </section>
    );
}
