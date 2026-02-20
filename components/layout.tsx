import { NavigationBar } from "./ui/navigatorIndex"

interface LayoutProps {
    children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-background">
            <NavigationBar />
            <main className="container mx-auto px-4 py-8 pt-20">
                {children}
            </main>
        </div>
    )
}
