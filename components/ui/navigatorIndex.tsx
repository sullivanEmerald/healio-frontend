"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./button";
import { useRouter } from "next/navigation";
// import { useAuth } from "@/hooks/use-auth";

export function NavigationBar() {
    const router = useRouter();
    // const { isAuthenticated, userRole } = useAuth();

    return (
        <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-sm z-50">
            <div className="container flex h-16 items-center justify-between px-4 max-w-7xl mx-auto">
                {/* Logo */}
                <div className="flex items-center space-x-8">
                    <Link href="/" className="flex items-center space-x-2">
                        {/* <Image
                            src="/adlogo.svg"
                            alt="Adminting Logo"
                            width={32}
                            height={32}
                            className="w-auto h-12"
                        /> */}
                        <span className="font-bold text-xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                            Healio
                        </span>
                    </Link>
                </div>

                {/* Centered Nav */}
                <nav className="hidden md:flex items-center space-x-6 flex-1 justify-center">

                    <Link
                        href="#"
                        className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                        About Us
                    </Link>
                    <Link
                        href="#"
                        className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                        Services
                    </Link>
                    <Link
                        href="#"
                        className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                        Contact Us
                    </Link>
                </nav>

                {/* Get Started Button */}
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="sm:flex"
                        onClick={() => {
                            router.push('/auth/login')
                        }}
                    >
                        {'Get Started'}
                    </Button>
                </div>
            </div>
        </header>
    );
}
