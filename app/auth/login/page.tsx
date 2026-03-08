"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { emailPattern } from "@/data/constants";
import { login } from "@/services/auth";
import { useRouter } from "next/navigation";
import { showToaster } from "@/lib/utils";

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
        setSubmitting(true);

        try {
            if (validateAll()) {
                const { user, access_token } = await login({ ...formData, role: User });
                console.log('Login successful:', user);

                localStorage.clear();

                // Store user data in localStorage
                localStorage.setItem("token", access_token);
                // localStorage.setItem("userId", user.id);
                // localStorage.setItem("email", user.email);
                localStorage.setItem("role", user.role);
                // localStorage.setItem("fullName", user.fullName);

                showToaster("Login successful", "success");

                // Redirect to dashboard
                const dashboardPath = user.role === "provider" ? "/provider/dashboard" : "/carer/dashboard";

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
            <h2 className="text-3xl font-bold text-center text-[#0C287B] mb-2">Welcome Back Sullivan</h2>
            <p className="text-center text-[#0C287B] mb-6">Please enter your credentials to continue</p>
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
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-primary mb-1">Password</label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                        required
                        className="border-2 border-primary focus:border-primary focus:ring-primary rounded-lg px-4 py-6 text-primary placeholder:text-primary/60 bg-transparent"
                        placeholder="Enter your password"
                    />
                    {errors.password && <span className="text-xs text-red-500 mt-1 block">{errors.password}</span>}
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-[#183b9e] text-white font-semibold rounded-lg px-4 py-6 text-lg shadow">
                    Login
                </Button>
            </form>
            <p className="text-center text-primary pt-2">Don't have an account? <Link href="/auth/account" className="text-red-500 underline">Register</Link></p>
        </>
    );
}