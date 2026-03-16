"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { emailPattern } from "@/data/constants";
import { login } from "@/services/auth";
import { useRouter } from "next/navigation";
import { showToaster } from "@/lib/utils";
import LineLoader from "@/components/common/lineLoader";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const User = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const validateField = (name: string, value: string) => {
        let error = '';
        if (name === 'email') {
            if (!value.trim()) {
                error = 'Email is required';
            } else if (!emailPattern.test(value.trim())) {
                error = 'Please enter a valid email address';
            }
        } else if (name === 'password') {
            if (!value.trim()) {
                error = 'Password is required';
            }
        };
        return error;
    }

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    };

    // Validate all fields
    const validateAll = () => {
        const newErrors: typeof errors = {
            email: validateField('email', formData.email),
            password: validateField('password', formData.password),
        };
        setErrors(newErrors);
        return Object.values(newErrors).every((e) => !e);
    };

    // Handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!User) {
            showToaster("User role not found. Please select a role before logging in.", "error");
            return;
        }
        setSubmitting(true);
        try {
            if (validateAll()) {
                const { user, access_token } = await login({ ...formData, role: User });
                localStorage.clear();
                localStorage.setItem("token", access_token);
                // localStorage.setItem("userId", user.id);
                // localStorage.setItem("email", user.email);
                localStorage.setItem("role", user.role);
                // localStorage.setItem("fullName", user.fullName);

                showToaster("Login successful", "success");

                // Redirect to dashboard
                const dashboardPath = user.role === "provider" ? "/provider/dashboard" : "/carer/dashboard";
                router.replace(dashboardPath);
                // Delay navigation to ensure localStorage is updated before redirecting
                setTimeout(() => {
                    router.replace(dashboardPath);
                }, 1000);

            }
        } catch (error: any) {
            console.error(error || 'Login failed');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <h2 className="text-3xl font-bold text-center text-primary mb-2">Welcome Back Sullivan</h2>
            <p className="text-center text-primary mb-6">Please enter your credentials to continue</p>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#0C287B] mb-1">Email</label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border-2 border-primary focus:border-primary focus:ring-primary rounded-lg px-4 py-6 text-primary placeholder:text-primary/60 bg-transparent"
                        placeholder="Enter your email"
                    />
                    {errors.email && <span className="text-xs text-red-500 mt-1 block">{errors.email}</span>}
                </div>
                <div className="relative">
                    <label htmlFor="password" className="block text-sm font-medium text-primary mb-1">Password</label>
                    <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="border-2 border-primary focus:border-primary focus:ring-primary rounded-lg px-4 py-6 text-primary placeholder:text-primary/60 bg-transparent pr-10"
                        placeholder="Enter your password"
                    />
                    <button
                        type="button"
                        tabIndex={-1}
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary focus:outline-none"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                    </button>
                    {errors.password && <span className="text-xs text-red-500 mt-1 block">{errors.password}</span>}
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-[#183b9e] text-white font-semibold rounded-lg px-4 py-6 text-lg shadow-sm hover:shadow-md transition duration-300" disabled={submitting}>
                    {submitting ? <div className="flex items-center justify-center gap-2"><LineLoader /> <span>Logging in...</span></div> : "Login"}
                </Button>
            </form>
            <p className="text-center text-primary pt-2">Don't have an account? <Link href="/auth/account" className="text-red-500 underline">Register</Link></p>
        </>
    );
}