import Link from "next/link"
export default function AppLogo() {
    return (
        <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
                <span className="font-bold text-xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    Healio
                </span>
            </Link>
        </div>
    )
}