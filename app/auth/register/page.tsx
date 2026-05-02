"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { phonePattern, validNamePattern, emailPattern, validatePassword, getAccountTypeDisplay } from "@/data/constants";
import { RegisterData } from "@/types/users";
import { register } from "@/services/auth";

export default function LoginPage() {
    const router = useRouter();
    const [accountType, setAccountType] = useState<string | null>(null);
    const [form, setForm] = useState<RegisterData>({
        firstName: "",
        lastName: "",
        businessEmail: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<Partial<Record<keyof RegisterData, string>>>({
        firstName: "",
        lastName: "",
        businessEmail: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    });
    const [submitting, setSubmitting] = useState(false);


    useEffect(() => {
        const user = typeof window !== 'undefined' ? localStorage.getItem('role') : null;
        if (!user) {
            router.push('/auth/account');
        } else {
            setAccountType(user);
        }
    }, [router]);

    // Validate a single field
    const validateField = (name: string, value: string) => {
        let error = '';
        if (name === 'firstName') {
            if (!value.trim()) {
                error = 'First name is required';
            } else if (!validNamePattern.test(value.trim())) {
                error = 'First name cannot contain special characters';
            }
        } else if (name === 'lastName') {
            if (!value.trim()) {
                error = 'Last name is required';
            } else if (!validNamePattern.test(value.trim())) {
                error = 'Last name cannot contain special characters';
            }
        } else if (name === 'businessEmail') {
            if (!value) {
                error = 'Business Email is required';
            } else if (!emailPattern.test(value)) {
                error = 'Please enter a valid email address';
            }
        } else if (name === 'phoneNumber') {
            if (!value) {
                error = 'Phone number is required';
            } else if (!phonePattern.test(value)) {
                error = 'Please enter a valid phone number';
            }
        } else if (name === 'password') {
            error = validatePassword(value);
        } else if (name === 'confirmPassword') {
            if (value !== form.password) {
                error = 'Passwords do not match';
            }
        }
        return error;
    };

    // Validate all fields
    const validateAll = () => {
        const newErrors: typeof errors = {
            firstName: validateField('firstName', form.firstName),
            lastName: validateField('lastName', form.lastName),
            businessEmail: validateField('businessEmail', form.businessEmail),
            phoneNumber: validateField('phoneNumber', form.phoneNumber),
            password: validateField('password', form.password),
            confirmPassword: validateField('confirmPassword', form.confirmPassword || ''),
        };
        setErrors(newErrors);
        return Object.values(newErrors).every((e) => !e);
    };

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    };

    // Handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (validateAll()) {
                const { confirmPassword, ...registerData } = form;
                const response = await register({ ...registerData, role: accountType! });
                setForm({
                    firstName: "",
                    lastName: "",
                    businessEmail: "",
                    phoneNumber: "",
                    password: "",
                    confirmPassword: "",
                });
                router.push('/auth/login');
                console.log('Registration successful:', response);
            } else {
                setSubmitting(false);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <>
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-primary/80">
                    Get Started As A {getAccountTypeDisplay(accountType)}
                </h2>
                <span className="text-gray-500  font-bold text-lg">Welcome to Healio</span>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-primary mb-1">First Name</label>
                    <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        required
                        className="border-2 border-primary focus:border-primary focus:ring-primary rounded-lg px-4 py-6 text-primary placeholder:text-primary/60 bg-transparent"
                        placeholder="Enter your first name"
                        value={form.firstName}
                        onChange={handleChange}
                        aria-invalid={!!errors.firstName}
                    />
                    {errors.firstName && <span className="text-xs text-red-500 mt-1 block">{errors.firstName}</span>}
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-primary mb-1">Last Name</label>
                    <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        required
                        className="border-2 border-primary focus:border-primary focus:ring-primary rounded-lg px-4 py-6 text-primary placeholder:text-primary/60 bg-transparent"
                        placeholder="Enter your last name"
                        value={form.lastName}
                        onChange={handleChange}
                        aria-invalid={!!errors.lastName}
                    />
                    {errors.lastName && <span className="text-xs text-red-500 mt-1 block">{errors.lastName}</span>}
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-primary mb-1">Business Email</label>
                    <Input
                        id="email"
                        name="businessEmail"
                        type="email"
                        autoComplete="email"
                        required
                        className="border-2 border-primary focus:border-primary focus:ring-primary rounded-lg px-4 py-6 text-primary placeholder:text-primary/60 bg-transparent"
                        placeholder="Enter your business email"
                        value={form.businessEmail}
                        onChange={handleChange}
                        aria-invalid={!!errors.businessEmail}
                    />
                    {errors.businessEmail && <span className="text-xs text-red-500 mt-1 block">{errors.businessEmail}</span>}
                </div>
                <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-primary mb-1">Phone Number</label>
                    <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        autoComplete="family-name"
                        required
                        className="border-2 border-primary focus:border-primary focus:ring-primary rounded-lg px-4 py-6 text-primary placeholder:text-primary/60 bg-transparent"
                        placeholder="Enter your phone number"
                        value={form.phoneNumber}
                        onChange={handleChange}
                        aria-invalid={!!errors.phoneNumber}
                    />
                    {errors.phoneNumber && <span className="text-xs text-red-500 mt-1 block">{errors.phoneNumber}</span>}
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-primary mb-1">Password</label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="border-2 border-primary focus:border-primary focus:ring-primary rounded-lg px-4 py-6 text-primary placeholder:text-primary/60 bg-transparent"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={handleChange}
                        aria-invalid={!!errors.password}
                    />
                    {errors.password && <span className="text-xs text-red-500 mt-1 block">{errors.password}</span>}
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-primary mb-1">Confirm Password</label>
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="border-2 border-primary focus:border-primary focus:ring-primary rounded-lg px-4 py-6 text-primary placeholder:text-primary/60 bg-transparent"
                        placeholder="Confirm your password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        aria-invalid={!!errors.confirmPassword}
                    />
                    {errors.confirmPassword && <span className="text-xs text-red-500 mt-1 block">{errors.confirmPassword}</span>}
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-[#183b9e] text-white font-semibold rounded-lg px-4 py-6 text-lg shadow" disabled={submitting}>
                    {submitting ? 'Creating account...' : 'Create Account'}
                </Button>
            </form>
            <p className="text-center text-primary pt-2 mb-6">Already have an account? <Link href="/auth/login" className="text-red-500 underline">Login</Link></p>
        </>
    );
}