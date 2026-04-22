import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className = "", ...props }, ref) => {
        return (
            <div className="">
                {label && (
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`border-1 border-primary focus:border-primary focus:ring-primary rounded-lg px-2 py-2 text-black placeholder:black bg-transparent ${className}`}
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
