import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className = "", ...props }, ref) => {
        return (
            <div className="w-full mb-4">
                {label && (
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`border-2 border-[#0C287B] focus:border-[#0C287B] focus:ring-[#0C287B] rounded-lg px-4 py-6 text-[#0C287B] placeholder:text-[#0C287B]/60 bg-transparent ${className}`}
                    {...props}
                />
                {error && (
                    <span className="text-xs text-red-500 mt-1 block">{error}</span>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;
