import AuthInformations from "@/components/authentication/testimonial";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row bg-white">
            <div className="hidden lg:block w-full md:w-1/2">
                <AuthInformations />
            </div>
            <div className="w-full lg:w-1/2 py-6 px-6">
                <div className="">{children}</div>
            </div>
        </div>
    );
}