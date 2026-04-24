"use client"
import Underline from "@/components/common/underline";
import ProviderHeader from "@/components/provider/components/header";
import Input from "@/components/common/input";
import Button from "@/components/common/button";
import LineLoader from "@/components/common/lineLoader";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { showToaster } from "@/lib/utils";
import { changePassword } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/userAuth";

export default function ProviderSettingsPage() {
    const router = useRouter();
    const { logout } = useAuth();
    const [user, setUser] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
    });
    const [errors, setErrors] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const validateField = (name: string, value: string) => {
        let error = '';
        if (name === 'oldPassword') {
            if (!value.trim()) {
                error = 'Old password is required';
            }
        } else if (name === 'newPassword') {
            if (!value.trim()) {
                error = 'New password is required';
            }
        } else if (name === 'confirmPassword') {
            if (!value.trim()) {
                error = 'Confirm password is required';
            } else if (value !== user.newPassword) {
                error = 'Passwords do not match';
            }
        }
        return error;
    };

    const validateAll = () => {
        const newErrors: typeof errors = {
            oldPassword: validateField('oldPassword', user.oldPassword),
            newPassword: validateField('newPassword', user.newPassword),
            confirmPassword: validateField('confirmPassword', user.confirmPassword),
        };
        setErrors(newErrors);
        return Object.values(newErrors).every((e) => !e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    };

    const handleTogglePassword = (field: keyof typeof showPassword) => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateAll()) {
            showToaster("Please fix the errors in the form before submitting.", "error");
            return;
        }

        setIsSubmitting(true);

        try {
            await changePassword({
                currentPassword: user.oldPassword,
                newPassword: user.newPassword,
            });
            showToaster("Password changed successfully.", "success");
            setUser({
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
        } catch (error: any) {
            if (error.response?.data?.redirect) {
                logout();
            }
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="w-full min-h-screen">
            <ProviderHeader title=" Account Settings" showToggleButtons={false} />
            <Underline />
            <form className="space-y-6 max-w-lg" onSubmit={handleSubmit} noValidate >
                <div className="relative">
                    <label htmlFor="oldPassword" className="block text-sm font-medium text-primary mb-1">Old Password</label>
                    <Input
                        id="oldPassword"
                        name="oldPassword"
                        type={showPassword.oldPassword ? "text" : "password"}
                        placeholder="enter your current password"
                        required
                        className="w-full py-4 pr-12"
                        value={user.oldPassword}
                        onChange={handleChange}
                    />
                    <button
                        type="button"
                        tabIndex={-1}
                        className="absolute right-3 top-13 transform -translate-y-1/2 text-gray-400 hover:text-primary focus:outline-none"
                        onClick={() => handleTogglePassword('oldPassword')}
                        aria-label={showPassword.oldPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword.oldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                <div className="relative">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-primary mb-1">New Password</label>
                    <Input
                        id="newPassword"
                        name="newPassword"
                        type={showPassword.newPassword ? "text" : "password"}
                        placeholder="enter your new password"
                        className="w-full py-4 pr-12"
                        required
                        value={user.newPassword}
                        onChange={handleChange}
                    />
                    <button
                        type="button"
                        tabIndex={-1}
                        className="absolute right-3 top-13 transform -translate-y-1/2 text-gray-400 hover:text-primary focus:outline-none"
                        onClick={() => handleTogglePassword('newPassword')}
                        aria-label={showPassword.newPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword.newPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                <div className="relative">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-primary mb-1">Confirm Password</label>
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPassword.confirmPassword ? "text" : "password"}
                        className="w-full py-4 pr-12"
                        placeholder="confirm your new password"
                        required
                        value={user.confirmPassword}
                        onChange={handleChange}
                    />
                    <button
                        type="button"
                        tabIndex={-1}
                        className="absolute right-3 top-13 transform -translate-y-1/2 text-gray-400 hover:text-primary focus:outline-none"
                        onClick={() => handleTogglePassword('confirmPassword')}
                        aria-label={showPassword.confirmPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword.confirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting} className="px-2 py-5">
                        {isSubmitting ? <LineLoader /> : 'Save Changes'}
                    </Button>
                </div>
            </form>
        </div>
    );
}