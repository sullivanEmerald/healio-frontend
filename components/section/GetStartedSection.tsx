import React from 'react';

export default function GetStartedSection() {
    return (
        <section className="w-full py-16 bg-transparent text-center">
            <h2 className="text-3xl font-bold text-[#0C287B] mb-6">Ready to Get Started?</h2>
            <div className="flex flex-col md:flex-row justify-center gap-6 mb-6">
                <div className="flex-1 bg-white rounded-xl shadow p-8 mx-2 border border-[#0C287B]/10">
                    <h3 className="text-xl font-semibold text-[#0C287B] mb-2">Care Provider</h3>
                    <p className="text-[#0C287B] mb-4 opacity-80">Find qualified carers, post shifts, and manage compliance with ease.</p>
                    <a href="/signup?role=provider" className="px-6 py-3 bg-[#0C287B] text-white rounded-lg font-semibold shadow hover:bg-[#183b9e] transition">Sign Up as Provider</a>
                </div>
                <div className="flex-1 bg-white rounded-xl shadow p-8 mx-2 border border-[#0C287B]/10">
                    <h3 className="text-xl font-semibold text-[#0C287B] mb-2">Care Worker</h3>
                    <p className="text-[#0C287B] mb-4 opacity-80">Access flexible shifts, get verified, and receive secure payments.</p>
                    <a href="/signup?role=worker" className="px-6 py-3 bg-[#0C287B] text-white rounded-lg font-semibold shadow hover:bg-[#183b9e] transition">Sign Up as Worker</a>
                </div>
            </div>
            <a href="/auth/login" className="text-[#0C287B] underline font-medium">Already have an account? Login</a>
        </section>
    );
}
