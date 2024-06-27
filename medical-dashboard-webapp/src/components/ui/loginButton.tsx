'use client'

import { signIn} from "next-auth/react";
import {DropdownMenuItem} from "@/components/ui/dropdown-menu";

export const LoginButton = () => {
    return (
        <DropdownMenuItem
            onClick={async () => {
                await signIn();
            }}
        >
            Se connecter
        </DropdownMenuItem>
    )
}