import React from "react";

interface RatingProps {
    value: number;
    max?: number;
    className?: string;
}

const Rating: React.FC<RatingProps> = ({ value, max = 5, className = "" }) => {
    return (
        <div className={`flex items-center ${className}`}>
            {[...Array(max)].map((_, idx) => {
                const full = idx < Math.floor(value);
                const half = idx === Math.floor(value) && value % 1 >= 0.5;
                if (full) {
                    return (
                        <svg
                            key={idx}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-yellow-500"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-9.19-.63L12 2 9.19 8.61 0 9.24l5.46 4.73L5.82 21z"
                            />
                        </svg>
                    );
                } else if (half) {
                    return (
                        <svg
                            key={idx}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-yellow-500"
                            viewBox="0 0 24 24"
                        >
                            <defs>
                                <clipPath id={`half-star-${idx}`}> <rect x="0" y="0" width="12" height="24" /> </clipPath>
                            </defs>
                            <path
                                d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-9.19-.63L12 2 9.19 8.61 0 9.24l5.46 4.73L5.82 21z"
                                fill="currentColor"
                                clipPath={`url(#half-star-${idx})`}
                            />
                            <path
                                d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-9.19-.63L12 2 9.19 8.61 0 9.24l5.46 4.73L5.82 21z"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            />
                        </svg>
                    );
                } else {
                    return (
                        <svg
                            key={idx}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-9.19-.63L12 2 9.19 8.61 0 9.24l5.46 4.73L5.82 21z"
                            />
                        </svg>
                    );
                }
            })}
        </div>
    );
};

export default Rating;
