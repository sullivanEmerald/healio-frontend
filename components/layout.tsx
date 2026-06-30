import { NavigationBar } from "./ui/navigatorIndex"

interface LayoutProps {
    children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-background">
            <NavigationBar />
            <main className="mt-30 sm:mt-40">
                {children}
            </main>
        </div>
    )
}
