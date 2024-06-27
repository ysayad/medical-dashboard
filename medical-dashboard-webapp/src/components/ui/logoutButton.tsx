'use client'

import { signOut } from "next-auth/react";
import {DropdownMenuItem} from "@/components/ui/dropdown-menu";

export const LogoutButton = () => {
    return (
        <DropdownMenuItem
            onClick={async () => {
                await signOut();
            }}
        >
            Se déconnecter
        </DropdownMenuItem>
    )
}