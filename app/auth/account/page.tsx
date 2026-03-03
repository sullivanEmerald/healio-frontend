"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SelectUser from "@/components/auth/SelectUser";


export default function RegisterPage() {

    return (
        <>
            <SelectUser isLogin={false} />
        </>
    );
}