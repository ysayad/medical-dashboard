import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {
    CircleUser,
    Home,
    LineChart,
    Menu,
    Package,
    Package2,
    Search,
    ShoppingCart,
    Users,
    LayoutDashboard,
    Hospital, Siren
} from "lucide-react";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {LoginButton} from "@/components/ui/loginButton";
import {LogoutButton} from "@/components/ui/logoutButton";
import {getAuthSession} from "@/lib/auth";

export default async function Header () {

    // @ts-ignore
    const session: user | null = await getAuthSession()

    return (

<header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
    <Sheet>
        <SheetTrigger asChild>
            <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
            >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
        </SheetContent>
    </Sheet>
    <div className="w-full flex-1">
    </div>
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
                {session ? <img src={session.user.image}/> : <CircleUser className="h-5 w-5" /> }
                <span className="sr-only">Toggle user menu</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            {session ? <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel> : null}
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            { session ? <LogoutButton/> : <LoginButton/> }
        </DropdownMenuContent>
    </DropdownMenu>
</header>
    )
}