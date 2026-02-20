"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function RegisterPage() {
    const router = useRouter();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userType = formData.get("userType");

        if (!userType) return;
        router.push(`/auth/register?account=${userType}`)
    };

    return (
        <>
            <h2 className="text-3xl font-bold text-center text-[#0C287B] mb-12">Choose Account Type</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                    {/* <label className="block text-sm font-medium text-[#0C287B] mb-1">Account Type</label> */}
                    <div className="flex flex-col gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="userType"
                                value="provider"
                                defaultChecked
                                className="accent-[#0C287B] w-5 h-5 border-2 border-[#0C287B] focus:ring-[#0C287B]"
                            />
                            <span className="text-[#0C287B] font-medium">Register as a Service Provider</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="userType"
                                value="worker"
                                className="accent-[#0C287B] w-5 h-5 border-2 border-[#0C287B] focus:ring-[#0C287B]"
                            />
                            <span className="text-[#0C287B] font-medium">Register as a Worker</span>
                        </label>
                    </div>
                </div>
                <Button type="submit" className="w-full bg-[#0C287B] hover:bg-[#183b9e] text-white font-semibold rounded-lg px-4 py-6 text-lg shadow">
                    Continue
                </Button>
            </form>
            <p className="text-center text-[#0C287B] pt-2">
                Already have an account? <Link href="/auth/login" className="text-red-500 underline">Login</Link>
            </p>
        </>
    );
}