import Button from "@/components/common/button";
import CloseButton from "@/components/common/closeButton";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
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
            <DrawerContent className="rounded-l-2xl !max-w-[400px] !px-0 shadow-xl border border-primary flex flex-col h-full">
                <DrawerHeader className="bg-primary text-white shadow-sm p-4 relative">
                    <DrawerTitle className="text-white text-lg font-bold">{header}</DrawerTitle>
                    <CloseButton onClick={onHide} />
                </DrawerHeader>
                {children}
            </DrawerContent>
        </Drawer>
    );
}
