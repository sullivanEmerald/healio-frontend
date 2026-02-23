
import { Card } from "@/components/ui/card";
export default function CardLayout({ children }: { children: React.ReactNode }) {
    return (
        <Card className="border border-primary/30 rounded-2xl p-4 hover:shadow-lg transition-shadow duration-300">
            {children}
        </Card>
    );
}