"use client";
import Underline from "@/components/common/underline";
import ProviderHeader from "@/components/provider/components/header";
import Input from "@/components/common/input";
import Button from "@/components/common/button";
import { useState, useEffect } from "react";
import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import { Provider } from "@/types/users";
import { emailPattern, phonePattern, validNamePattern } from "@/data/constants";
import { showToaster } from "@/lib/utils";
import { updateProviderDetails } from "@/services/user";
import LineLoader from "@/components/common/lineLoader";


export default function PersonalInformationPage() {
    const { provider, getProviderDetails, isLoading } = useStore(useShallow((state) => ({
        provider: state.provider,
        getProviderDetails: state.getProviderDetails,
        isLoading: state.loading.isFetchingProviderDetails,
    })));
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        businessEmail: '',
        phoneNumber: '',

    });
    const [errors, setErrors] = useState<Partial<Record<keyof Provider, string>>>({
        firstName: "",
        lastName: "",
        businessEmail: "",
        phoneNumber: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        }
        return error;
    };

    const validateAll = () => {
        const newErrors: typeof errors = {
            firstName: validateField('firstName', user.firstName),
            lastName: validateField('lastName', user.lastName),
            businessEmail: validateField('businessEmail', user.businessEmail),
            phoneNumber: validateField('phoneNumber', user.phoneNumber),
        };
        setErrors(newErrors);
        return Object.values(newErrors).every((e) => !e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    };

    useEffect(() => {
        getProviderDetails();
    }, [getProviderDetails]);

    useEffect(() => {
        if (provider) {
            setUser({
                firstName: provider.firstName,
                lastName: provider.lastName,
                businessEmail: provider.businessEmail,
                phoneNumber: provider.phoneNumber,
            });
        }
    }, [provider]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateAll()) {
            showToaster("Please fix the errors in the form before submitting.", "error");
            return;
        }

        try {
            setIsSubmitting(true);
            await updateProviderDetails(user);
            setUser(user);
            showToaster("Profile updated successfully", "success");
        } catch (error) {
            showToaster("Failed to update profile", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full min-h-screen">
            <ProviderHeader title="Personal Information" showToggleButtons={false} />
            <Underline />
            <form className="space-y-6 max-w-lg" onSubmit={handleSubmit} noValidate >
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-primary mb-1">First Name</label>
                    <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        required
                        className="w-full py-4"
                        value={user.firstName}
                        onChange={handleChange}
                    // aria-invalid={!!errors.firstName}
                    />
                    {/* {errors.firstName && <span className="text-xs text-red-500 mt-1 block">{errors.firstName}</span>} */}
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-primary mb-1">Last Name</label>
                    <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        className="w-full py-4"
                        required
                        value={user.lastName}
                        onChange={handleChange}
                    // aria-invalid={!!errors.lastName}
                    />
                    {/* {errors.lastName && <span className="text-xs text-red-500 mt-1 block">{errors.lastName}</span>} */}
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-primary mb-1">Business Email</label>
                    <Input
                        id="email"
                        name="businessEmail"
                        type="email"
                        autoComplete="email"
                        className="w-full py-4"
                        readOnly
                        required
                        placeholder="Enter your business email"
                        value={user.businessEmail}
                        onChange={handleChange}
                    // aria-invalid={!!errors.businessEmail}
                    />
                    {/* {errors.businessEmail && <span className="text-xs text-red-500 mt-1 block">{errors.businessEmail}</span>} */}
                </div>
                <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-primary mb-1">Phone Number</label>
                    <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        className="w-full py-4"
                        type="text"
                        autoComplete="family-name"
                        required
                        value={user.phoneNumber}
                        onChange={handleChange}
                    // aria-invalid={!!errors.phoneNumber}
                    />
                    {/* {errors.phoneNumber && <span className="text-xs text-red-500 mt-1 block">{errors.phoneNumber}</span>} */}
                </div>
                <Button type="submit" disabled={isSubmitting || isLoading} className="px-6 py-3">
                    {isSubmitting ? <LineLoader /> : 'Save Changes'}
                </Button>
            </form>
        </div>
    );
}   