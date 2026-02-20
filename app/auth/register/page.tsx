"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
    const searchParams = useSearchParams();
    const accountType = searchParams.get("account");

    return (
        <>
            <h2 className="text-3xl font-bold text-center text-[#0C287B] mb-2 mt-4">Continue as {accountType}</h2>
            <form className="space-y-6">
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-[#0C287B] mb-1">First Name</label>
                    <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        required
                        className="border-2 border-[#0C287B] focus:border-[#0C287B] focus:ring-[#0C287B] rounded-lg px-4 py-6 text-[#0C287B] placeholder:text-[#0C287B]/60 bg-transparent"
                        placeholder="Enter your first name"
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-[#0C287B] mb-1">Last Name</label>
                    <Input
                        id="lastName"
                        name="last  Name"
                        type="text"
                        autoComplete="family-name"
                        required
                        className="border-2 border-[#0C287B] focus:border-[#0C287B] focus:ring-[#0C287B] rounded-lg px-4 py-6 text-[#0C287B] placeholder:text-[#0C287B]/60 bg-transparent"
                        placeholder="Enter your last name"
                    />
                </div>
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
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-[#0C287B] mb-1">Phone Number</label>
                    <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        autoComplete="family-name"
                        required
                        className="border-2 border-[#0C287B] focus:border-[#0C287B] focus:ring-[#0C287B] rounded-lg px-4 py-6 text-[#0C287B] placeholder:text-[#0C287B]/60 bg-transparent"
                        placeholder="Enter your phone number"
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
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#0C287B] mb-1">Confirm Password</label>
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="border-2 border-[#0C287B] focus:border-[#0C287B] focus:ring-[#0C287B] rounded-lg px-4 py-6 text-[#0C287B] placeholder:text-[#0C287B]/60 bg-transparent"
                        placeholder="Confirm your password"
                    />
                </div>
                <Button type="submit" className="w-full bg-[#0C287B] hover:bg-[#183b9e] text-white font-semibold rounded-lg px-4 py-6 text-lg shadow">
                    Login
                </Button>
            </form>
            <p className="text-center text-[#0C287B] pt-2 mb-6">Already have an account? <Link href="/auth/login" className="text-red-500 underline">Login</Link></p>
        </>
    );
}