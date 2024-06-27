import NextAuth, {NextAuthOptions} from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter";
import { PrismaClient } from '@prisma/client'
import GoogleProvider from "next-auth/providers/google"

const googleId = process.env.AUTH_GOOGLE_ID
const googleSecret = process.env.AUTH_GOOGLE_SECRET

if (!googleId || !googleSecret) {
    throw new Error('Missing googleId or googleSecret')
}

const prisma = new PrismaClient()

export const authConfig = ({
    providers: [
        GoogleProvider({
            clientId: googleId,
            clientSecret: googleSecret,
        }),
    ],
    // @ts-ignore
    adapter: PrismaAdapter(prisma),
    callbacks: {
        session: async ({session, user}) => {
            console.log(session, user)
            if (session.user) {
                // @ts-ignore
                session.user.role = user.role;
            }
            return session;
        }
    }
}) satisfies NextAuthOptions

// @ts-ignore
export default NextAuth(authConfig)