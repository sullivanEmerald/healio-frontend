
import CloseButton from "@/components/common/closeButton";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";

export default function CustomDrawer({
    show,
    onHide,
    children,
    header
}: {
    show: boolean;
    onHide: () => void;
    children?: React.ReactNode;
    header: string;
}) {
    return (
        <Drawer open={show} onOpenChange={onHide} direction="right">
            <DrawerContent className="bg-gray-300 h-screen w-full max-w-md overflow-y-auto overflow-x-hidden border shadow-md shadow-gray-400 outline-none rounded-l-lg">
                <DrawerHeader className="bg-transparent text-muted-foreground shadow-sm relative">
                    <DrawerTitle className="text-muted-foreground text-lg font-bold">{header}</DrawerTitle>
                    <CloseButton onClick={onHide} />
                </DrawerHeader>
                {children}
            </DrawerContent>
        </Drawer>
    );
}
