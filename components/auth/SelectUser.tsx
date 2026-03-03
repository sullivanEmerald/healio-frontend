import { Button } from "@/components/ui/button"
import Link from "next/dist/client/link"
import { useRouter } from "next/navigation"

export default function SelectUser({ isLogin = false }: { isLogin?: boolean }) {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userType = formData.get("userType");

        if (!userType) return;
        if (typeof window !== 'undefined') {
            localStorage.setItem('user', userType.toString());
        }
        router.push(`/auth/register`)
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
                                className="accent-primary w-5 h-5 border-2 border-primary focus:ring-primary"
                            />
                            <span className="text-primary font-medium">Provider</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="userType"
                                value="carer"
                                className="accent-primary w-5 h-5 border-2 border-primary focus:ring-primary"
                            />
                            <span className="text-primary font-medium">Carer</span>
                        </label>
                    </div>
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-[#183b9e] text-white font-semibold rounded-lg px-4 py-6 text-lg shadow">
                    Continue
                </Button>
            </form>
            {!isLogin ? <p className="text-center text-primary pt-2">Already have an account? <Link href="/auth/login" className="text-red-500 underline">Login</Link></p> : <p className="text-center text-primary pt-2">Don't have an account? <Link href="/auth/register" className="text-red-500 underline">Register</Link></p>}
        </>
    )
}