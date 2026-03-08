import { useAuth } from "@/hooks/userAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader } from "../common/loader";

export const RoleGuard = ({ children, role }: { children: React.ReactNode; role: string }) => {
    const userRole = typeof window !== 'undefined' ? localStorage.getItem('role') : null;
    const { isLoading, user } = useAuth();
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [redirectMessage, setRedirectMessage] = useState("");


    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                setRedirectMessage("Authentication failed. Please log in again.");
                setIsRedirecting(true);
                setTimeout(() => {
                    router.push("/auth/login");
                }, 3000);
                return;
            }

            if (userRole && userRole !== role) {
                setRedirectMessage("You do not have permission to access this page.");
                setIsRedirecting(true);
                setTimeout(() => {
                    router.push("/auth/login");
                }, 1000);
                return;
            }
        }
    }, [isLoading, userRole, role, router, user]);


    // Remove setState from render, only show unauthorized if not redirecting/loading
    if (!userRole || userRole !== role) {
        // Only show unauthorized if not already redirecting/loading
        if (!isRedirecting && !isLoading) {
            return (
                <div className="flex flex-col items-center justify-center mt-20">
                    <Loader className="h-16 w-16 mx-auto" />
                    <p className="text-center mt-4 text-gray-600">You do not have permission to access this page.</p>
                </div>
            );
        }
        return null;
    }

    return (
        <>
            {isRedirecting || isLoading ? (
                <>
                    <Loader className="h-16 w-16 mx-auto mt-20" />
                    {isRedirecting && (
                        <p className="text-center mt-4 text-gray-600">{redirectMessage}</p>
                    )}
                </>
            ) : (
                children
            )}
        </>
    );
};