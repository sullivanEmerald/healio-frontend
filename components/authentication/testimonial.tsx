import React from 'react';
import { ShieldCheck, UserPlus, LogIn, KeyRound, MessageCircle } from 'lucide-react';

export default function AuthInformations() {
    return (
        <div className="min-h-screen fixed w-[45%] flex flex-col md:flex-row bg-white p-6">
            <aside className="hidden md:flex bg-[#0C287B] w-full text-white flex-col justify-center items-center relative rounded-2xl">
                <div className="max-w-md w-full flex flex-col gap-8 items-center">
                    <div className="flex flex-col items-center gap-2">
                        <ShieldCheck className="w-12 h-12 text-white mb-2" />
                        <h2 className="text-3xl font-bold text-center">Welcome to Healio</h2>
                        <p className="text-lg text-center opacity-90">
                            Your trusted platform for care staffing, compliance, and secure connections.
                        </p>
                    </div>
                    <div className="flex flex-col gap-6 mt-8 w-full">
                        <div className="flex items-center gap-4">
                            <UserPlus className="w-7 h-7 text-white" />
                            <span className="font-semibold">Easy Registration</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <LogIn className="w-7 h-7 text-white" />
                            <span className="font-semibold">Quick & Secure Login</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <KeyRound className="w-7 h-7 text-white" />
                            <span className="font-semibold">Role-based Access</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <MessageCircle className="w-7 h-7 text-white" />
                            <span className="font-semibold">Supportive Community</span>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-6 left-0 w-full text-center text-xs opacity-60">
                    &copy; {new Date().getFullYear()} Healio
                </div>
            </aside>
        </div>
    );
}
