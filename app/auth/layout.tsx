import AuthInformations from "@/components/authentication/testimonial";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row">
            <div className="hidden md:block md:w-5/12 w-full">
                <AuthInformations />
            </div>
            <div className="md:w-7/12 w-full bg-white flex items-center justify-center">
                <div className="w-full md:w-1/2 p-4">{children}</div>
            </div>
        </div>
    );
}