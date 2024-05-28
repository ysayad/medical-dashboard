import Link from "next/link";
import {Bell, Home, LineChart, Package, Package2, ShoppingCart, Users} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";

const Sidebar = () => {
    return (
<div className="flex h-full max-h-screen flex-col gap-2">
    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Medical Dashboard</span>
        </Link>
        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
        </Button>
    </div>
    <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
                href="hospitals/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
                <Home className="h-4 w-4" />
                Hôpitaux
            </Link>
            <Link
                href="doctors/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
                <ShoppingCart className="h-4 w-4" />
                Praticiens
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                </Badge>
            </Link>
            <Link
                href="#"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
            >
                <Package className="h-4 w-4" />
                Products{" "}
            </Link>
            <Link
                href="urgences/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
                <Users className="h-4 w-4" />
                Urgences
            </Link>
            <Link
                href="patients/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
                <LineChart className="h-4 w-4" />
                Statistiques patients
            </Link>
        </nav>
    </div>
</div>
    )
}

export default Sidebar