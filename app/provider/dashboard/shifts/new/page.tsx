"use client";
import { useState } from "react";
import Overview from "@/components/provider/overview";
import Underline from "@/components/common/underline";
import Button from "@/components/common/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import RichTextEditor from "@/components/ui/richTextEditor";
import { DatePicker } from "@/components/ui/datePicker";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { showToaster } from "@/lib/utils";
import { CreateShift } from "@/services/provider";

const steps = ["Shift Details", "Requirements", "Pricing"];

export default function NewShift() {
    const [step, setStep] = useState(0);
    const [form, setForm] = useState({
        // Step 1: Shift Details
        title: "",
        postcode: "",
        startDate: undefined as Date | undefined,
        endDate: undefined as Date | undefined,
        startTime: "",
        endTime: "",
        shiftType: "",
        numberOfCarers: 1,
        description: "",
        // Step 2: Requirements
        skills: "",
        experience: "",
        genderPreference: "",
        language: "",
        enhancedDBS: false,
        rightToWork: false,
        // Step 3: Pricing
        hourlyRate: "",
        expenses: "",
        paymentFrequency: "Weekly",
    });
    const [errors, setErrors] = useState({
        title: "",
        description: "",
        postcode: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        shiftType: "",
        numberOfCarers: "",
        skills: "",
        experience: "",
        genderPreference: "",
        language: "",
        hourlyRate: "",
        expenses: "",
        paymentFrequency: "",
    });

    // Step fields for validation
    const stepFields = [
        ["title", "description", "postcode", "startDate", "endDate", "startTime", "endTime", "shiftType", "numberOfCarers"], // Step 0
        ["skills", "experience", "language"], // Step 1
        ["hourlyRate", "paymentFrequency"], // Step 2
    ];

    const validateField = (name: string, value: any) => {
        let error = '';
        if (name === 'title') {
            if (!value.trim()) error = 'Title is required';
        } else if (name === 'description') {
            if (!value || value.length < 5) error = 'Description must be at least 5 characters';
        } else if (name === 'postcode') {
            if (!value.trim()) error = 'Postcode is required';
        } else if (name === 'startDate') {
            if (!value) error = 'Start date is required';
        } else if (name === 'endDate') {
            if (!value) error = 'End date is required';
        } else if (name === 'startTime') {
            if (!value.trim()) error = 'Start time is required';
        } else if (name === 'endTime') {
            if (!value.trim()) error = 'End time is required';
        } else if (name === 'shiftType') {
            if (!value.trim()) error = 'Shift type is required';
        } else if (name === 'numberOfCarers') {
            if (!value || Number(value) < 1) error = 'At least 1 carer is required';
        } else if (name === 'skills') {
            if (!value.trim()) error = 'Skills are required';
        } else if (name === 'experience') {
            if (!value || Number(value) < 0) error = 'Experience is required';
        } else if (name === 'language') {
            if (!value.trim()) error = 'Language is required';
        } else if (name === 'hourlyRate') {
            if (!value || Number(value) <= 0) error = 'Hourly rate must be greater than 0';
        } else if (name === 'paymentFrequency') {
            if (!value.trim()) error = 'Payment frequency is required';
        }
        return error;
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value, type } = e.target;
        let fieldValue: string | boolean = value;
        if (type === "checkbox" && e.target instanceof HTMLInputElement) {
            fieldValue = e.target.checked;
        }
        setForm((prev) => ({
            ...prev,
            [name]: fieldValue,
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: validateField(name, fieldValue),
        }));
    };

    const validateAll = () => {
        const newErrors: typeof errors = {
            title: validateField('title', form.title),
            description: validateField('description', form.description),
            postcode: validateField('postcode', form.postcode),
            startDate: validateField('startDate', form.startDate),
            endDate: validateField('endDate', form.endDate),
            startTime: validateField('startTime', form.startTime),
            endTime: validateField('endTime', form.endTime),
            shiftType: validateField('shiftType', form.shiftType),
            numberOfCarers: validateField('numberOfCarers', form.numberOfCarers),
            skills: validateField('skills', form.skills),
            experience: validateField('experience', form.experience),
            genderPreference: '', // optional
            language: validateField('language', form.language),
            hourlyRate: validateField('hourlyRate', form.hourlyRate),
            expenses: '', // optional
            paymentFrequency: validateField('paymentFrequency', form.paymentFrequency),
        };
        setErrors(newErrors);
        return Object.values(newErrors).every((e) => !e);
    };

    // Validate only fields for the current step
    const validateStep = (stepIdx: number) => {
        const fields = stepFields[stepIdx];
        const newErrors = { ...errors };
        let valid = true;
        fields.forEach((field) => {
            const error = validateField(field, form[field as keyof typeof form]);
            newErrors[field as keyof typeof newErrors] = error;
            if (error) valid = false;
        });
        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateAll()) {
            showToaster("Please fix the errors in the form.");
            return;
        }
        try {
            const response = await CreateShift(form)
            console.log("Created shift:", response);
            showToaster("Shift created successfully!");
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Overview title="Create New Shift" />
            <Underline />
            <div className="mb-4 flex gap-4">
                {steps.map((label, idx) => (
                    <p
                        key={label}
                        onClick={() => setStep(idx)}
                        className={` py-2 transition-colors cursor-pointer text-primary font-semibold ${step === idx ? "text-black border-b-2 border-primary" : "bg-tranparent"
                            }`}
                    >
                        {label}
                    </p>
                ))}
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
                {step === 0 && (
                    <>
                        <div>
                            <Label htmlFor="title" className="block text-sm font-medium text-primary mb-1">Title</Label>
                            <Input
                                id="title"
                                name="title"
                                type="text"
                                onChange={handleChange}
                                required
                                className="border-2 border-primary focus:border-primary focus:ring-primary rounded-lg px-4 py-6 text-primary placeholder:text-primary/60 bg-transparent"
                                placeholder="Enter your title"
                            />
                            {errors.title && <span className="text-xs text-red-500 mt-1 block">{errors.title}</span>}
                        </div>
                        <div>
                            <Label htmlFor="description" className="block text-sm font-medium text-primary mb-1">Description</Label>
                            <RichTextEditor
                                value={form.description}
                                onChange={(value) => setForm((prev) => ({ ...prev, description: value }))}
                                className="border-primary focus:border-gray focus:ring-gray placeholder:text-primary/60 bg-transparent"
                            />
                            {errors.description && <span className="text-xs text-red-500 mt-1 block">{errors.description}</span>}
                        </div>
                        <div>
                            <Label htmlFor="postcode" className="block text-sm font-medium text-primary mb-1">Postcode</Label>
                            <Input
                                id="postcode"
                                name="postcode"
                                value={form.postcode}
                                onChange={handleChange}
                                className="input"
                            />
                            {errors.postcode && <span className="text-xs text-red-500 mt-1 block">{errors.postcode}</span>}
                        </div>
                        <div>
                            <Label className="block text-sm font-medium text-primary mb-1">Start Date</Label>
                            <DatePicker
                                date={form.startDate}
                                onChange={(date: any) => date && setForm({ ...form, startDate: date })}
                            />
                            {errors.startDate && <span className="text-xs text-red-500 mt-1 block">{errors.startDate}</span>}
                        </div>
                        <div>
                            <Label className="block text-sm font-medium text-primary mb-1">End Date</Label>
                            <DatePicker
                                date={form.endDate}
                                onChange={(date: any) => date && setForm({ ...form, endDate: date })}
                            />
                            {errors.endDate && <span className="text-xs text-red-500 mt-1 block">{errors.endDate}</span>}
                        </div>
                        <div>
                            <Label htmlFor="startTime" className="block text-sm font-medium text-primary mb-1">Start Time</Label>
                            <Input
                                type="time"
                                name="startTime"
                                value={form.startTime}
                                onChange={handleChange}
                                className="input"
                            />
                            {errors.startTime && <span className="text-xs text-red-500 mt-1 block">{errors.startTime}</span>}
                        </div>
                        <div>
                            <Label htmlFor="endTime" className="block text-sm font-medium text-primary mb-1">End Time</Label>
                            <Input
                                type="time"
                                name="endTime"
                                value={form.endTime}
                                onChange={handleChange}
                                className="input"
                            />
                            {errors.endTime && <span className="text-xs text-red-500 mt-1 block">{errors.endTime}</span>}
                        </div>
                        <div>
                            <Label htmlFor="shiftType" className="block text-sm font-medium text-primary mb-1">Shift Type</Label>
                            <Select
                                value={form.shiftType}
                                onValueChange={(value) => setForm((prev) => ({ ...prev, shiftType: value }))
                                }
                            >
                                <SelectTrigger className="input">
                                    <SelectValue placeholder="Select shift type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Day">Day</SelectItem>
                                    <SelectItem value="Night">Night</SelectItem>
                                    <SelectItem value="Live-in">Live-in</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.shiftType && <span className="text-xs text-red-500 mt-1 block">{errors.shiftType}</span>}
                        </div>
                        <div>
                            <Label htmlFor="numberOfCarers" className="block text-sm font-medium text-primary mb-1">Number of Carers Needed</Label>
                            <Input
                                type="number"
                                min={1}
                                name="numberOfCarers"
                                value={form.numberOfCarers}
                                onChange={handleChange}
                                className="input"
                            />
                            {errors.numberOfCarers && <span className="text-xs text-red-500 mt-1 block">{errors.numberOfCarers}</span>}
                        </div>
                    </>
                )}
                {step === 1 && (
                    <>
                        <div>
                            <Label htmlFor="skills" className="block text-sm font-medium text-primary mb-1">Required Skills</Label>
                            <Input
                                id="skills"
                                name="skills"
                                value={form.skills}
                                onChange={handleChange}
                                className="input"
                                placeholder="e.g. Dementia care, Medication"
                            />
                            {errors.skills && <span className="text-xs text-red-500 mt-1 block">{errors.skills}</span>}
                        </div>
                        <div>
                            <Label htmlFor="experience" className="block text-sm font-medium text-primary mb-1">Experience (years)</Label>
                            <Input
                                id="experience"
                                type="number"
                                min={0}
                                name="experience"
                                value={form.experience}
                                onChange={handleChange}
                                className="input"
                            />
                            {errors.experience && <span className="text-xs text-red-500 mt-1 block">{errors.experience}</span>}
                        </div>
                        <div>
                            <Label htmlFor="genderPreference" className="block text-sm font-medium text-primary mb-1">Gender Preference</Label>
                            <Select
                                value={form.genderPreference || "no-preference"}
                                onValueChange={(value) => setForm((prev) => ({ ...prev, genderPreference: value === "no-preference" ? "" : value }))
                                }
                            >
                                <SelectTrigger className="input">
                                    <SelectValue placeholder="No preference" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="no-preference">No preference</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                    <SelectItem value="Male">Male</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="language" className="block text-sm font-medium text-primary mb-1">Language Requirement</Label>
                            <Input
                                id="language"
                                name="language"
                                value={form.language}
                                onChange={handleChange}
                                className="input"
                                placeholder="e.g. English, Polish"
                            />
                            {errors.language && <span className="text-xs text-red-500 mt-1 block">{errors.language}</span>}
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="enhancedDBS"
                                checked={form.enhancedDBS}
                                onCheckedChange={(checked) => setForm((prev) => ({ ...prev, enhancedDBS: !!checked }))}
                            />
                            <Label htmlFor="enhancedDBS" className="text-primary">Enhanced DBS required</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="rightToWork"
                                checked={form.rightToWork}
                                onCheckedChange={(checked) => setForm((prev) => ({ ...prev, rightToWork: !!checked }))}
                            />
                            <Label htmlFor="rightToWork" className="text-primary">Right to work in the UK</Label>
                        </div>
                    </>
                )}
                {step === 2 && (
                    <>
                        <div>
                            <Label htmlFor="hourlyRate" className="block text-sm font-medium text-primary mb-1">Hourly Rate (£)</Label>
                            <Input
                                id="hourlyRate"
                                type="number"
                                min={0}
                                name="hourlyRate"
                                value={form.hourlyRate}
                                onChange={handleChange}
                                className="input"
                            />
                            {errors.hourlyRate && <span className="text-xs text-red-500 mt-1 block">{errors.hourlyRate}</span>}
                        </div>
                        <div>
                            <Label htmlFor="expenses" className="block text-sm font-medium text-primary mb-1">Expenses (if any)</Label>
                            <Textarea
                                id="expenses"
                                name="expenses"
                                value={form.expenses}
                                onChange={handleChange}
                                className="input"
                                placeholder="e.g. Travel, Meals"
                            />
                        </div>
                        <div>
                            <Label htmlFor="paymentFrequency" className="block text-sm font-medium text-primary mb-1">Payment Frequency</Label>
                            <Select
                                value={form.paymentFrequency}
                                onValueChange={(value) => setForm((prev) => ({ ...prev, paymentFrequency: value }))
                                }
                            >
                                <SelectTrigger className="input">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Weekly">Weekly</SelectItem>
                                    <SelectItem value="Monthly">Monthly</SelectItem>
                                    <SelectItem value="End of Shift">End of Shift</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.paymentFrequency && <span className="text-xs text-red-500 mt-1 block">{errors.paymentFrequency}</span>}
                        </div>
                    </>
                )}
                <div className="flex flex-col md:flex-row items-center justify-between">
                    {step > 0 && (
                        <Button
                            type="button"
                            onClick={() => setStep(step - 1)}
                            className="w-full md:w-auto"
                        >
                            <ChevronLeft size={20} className="" /> Back
                        </Button>
                    )}
                    {step < steps.length - 1 ? (
                        <Button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (validateStep(step)) {
                                    setStep(step + 1);
                                }
                            }}
                            className="w-full md:w-auto"
                        >
                            Next <ChevronRight size={20} className="" />
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full md:w-auto">
                            Publish Shift
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
}