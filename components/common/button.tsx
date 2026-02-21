import { Button as ShadcnButton } from "@/components/ui/button";
import React from "react";

interface ButtonProps extends React.ComponentProps<typeof ShadcnButton> {
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ className = "", children, ...props }) => {
    return (
        <ShadcnButton
            className={`mt-4 w-full bg-primary text-white py-2 rounded-full font-semibold hover:bg-primary/90 transition cursor-pointer shadow-md ${className}`}
            {...props}
        >
            {children}
        </ShadcnButton>
    );
};

export default Button;
