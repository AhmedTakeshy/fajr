import { DefaultSession, DefaultUser } from "next-auth";
import { JWT,DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's postal address. */
            id: string,
            role: string,
        } & DefaultSession["user"]
    }

    interface User extends DefaultUser {
        id: string
        role: string
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        role: string
    }
}
