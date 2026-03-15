import Image from "next/image";
import Button from "../common/button";

interface NotFoundComponentProps {
    title: string;
    subTitle?: string;
    buttonText?: string;
    onButtonClick?: () => void;
    className?: string;
}

export const NotFoundComponent = ({
    title,
    subTitle,
    buttonText,
    onButtonClick,
    className = "",
}: NotFoundComponentProps) => {
    return (
        <div className="flex items-center justify-center w-full h-full min-h-[60vh]">
            <div
                className={`flex flex-col gap-6 justify-start bg-white px-2 py-4 shadow-lg outline rounded-lg mx-auto ${className}`}
                style={{ minWidth: 320, maxWidth: 480 }}
                {...(className ? {} : { "data-aos": "fade-up" })}
            >
                {/* <Image
            src="/not-found.svg" // Place your SVG in public folder as not-found.svg
            alt="Page not found"
            width={220}
            height={220}
            className="mb-6"
            priority
            /> */}
                <h2 className="text-2xl font-bold text-primary text-center">{title}</h2>
                {subTitle && (
                    <p className="text-base text-gray-500">{subTitle}</p>
                )}
                {buttonText && onButtonClick && (
                    <Button
                        onClick={onButtonClick}
                        className="p-6"
                    >
                        {buttonText}
                    </Button>
                )}
            </div>
        </div>
    );
};
