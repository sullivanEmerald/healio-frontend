"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
    return (
        <>
            <h2 className="text-3xl font-bold text-center text-[#0C287B] mb-2">Welcome Back Sullivan</h2>
            <p className="text-center text-[#0C287B] mb-6">Please enter your credentials to continue</p>
            <form className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#0C287B] mb-1">Email</label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="border-2 border-[#0C287B] focus:border-[#0C287B] focus:ring-[#0C287B] rounded-lg px-4 py-6 text-[#0C287B] placeholder:text-[#0C287B]/60 bg-transparent"
                        placeholder="Enter your email"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-[#0C287B] mb-1">Password</label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="border-2 border-[#0C287B] focus:border-[#0C287B] focus:ring-[#0C287B] rounded-lg px-4 py-6 text-[#0C287B] placeholder:text-[#0C287B]/60 bg-transparent"
                        placeholder="Enter your password"
                    />
                </div>
                <Button type="submit" className="w-full bg-[#0C287B] hover:bg-[#183b9e] text-white font-semibold rounded-lg px-4 py-6 text-lg shadow">
                    Login
                </Button>
            </form>
            <p className="text-center text-[#0C287B] pt-2">Don't have an account? <Link href="/auth/account" className="text-red-500 underline">Register</Link></p>
        </>
    );
}