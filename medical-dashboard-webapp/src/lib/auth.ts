import {getServerSession} from "next-auth";
import {authConfig} from "@/pages/api/auth/[...nextauth]";

export const getAuthSession = () => {
    // @ts-ignore
    return getServerSession(authConfig)
}