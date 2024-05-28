"use client"

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {Bell, Home, LineChart, Package, Package2, ShoppingCart, Users} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";

const Sidebar = () => {
    const pathname = usePathname();

    const sidebarLinks = [
        { href: '/hospitals', label: 'Hôpitaux' },
        { href: '/doctors', label: 'Praticiens' },
        { href: '/urgences', label: 'Urgences' },
        { href: '/patients', label: 'Statistiques patients' },
    ];

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
            {sidebarLinks.map(({ href, label }, index) => (
                <Link
                    key={index}
                    href={href}
                    className= { pathname === href ?
                        "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary" :
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    }
                >
                    <Home className="h-4 w-4" />
                    {label}
                </Link>
            ))}
        </nav>
    </div>
</div>
    )
}

export default Sidebar