import { useAuth } from "@/hooks/userAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export const RoleGuard = ({ children, role }: { children: React.ReactNode; role: string }) => {
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
                }, 2000);
                return;
            }

            if (user && user.role !== role) {
                setRedirectMessage("You do not have permission to access this page.");
                setIsRedirecting(true);
                setTimeout(() => {
                    router.push("/auth/login");
                }, 2000);
                return;
            }
        }
    }, [isLoading, role, router, user]);


    // Remove setState from render, only show unauthorized if not redirecting/loading
    // if (!user || user.role !== role) {
    //     // Only show unauthorized if not already redirecting/loading
    //     if (!isRedirecting && !isLoading) {
    //         return (
    //             <div className="flex flex-col items-center justify-center mt-20">
    //                 <Loader className="h-16 w-16 mx-auto" />
    //                 <p className="text-center mt-4 text-gray-600">You do not have permission to access this page.</p>
    //             </div>
    //         );
    //     }
    //     return null;
    // }

    return (
        <>
            {isLoading ? (
                <div className="flex flex-col items-center justify-center mt-30">
                    <Loader2 className="h-12 w-12 text-primary animate-spin" />
                </div>
            ) : !isLoading && isRedirecting ? (
                <div className="flex flex-col items-center justify-center mt-30">
                    <Loader2 className="h-12 w-12 text-primary animate-spin" />
                    <p className="text-center font-semibold mt-4 text-primary">{redirectMessage}</p>
                </div>
            ) : (
                children
            )}
        </>
    );
};