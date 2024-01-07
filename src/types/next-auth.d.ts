import NextAuth from "next-auth"
import { NextAuthUser } from "@/types/User"

declare module "next-auth" {
  interface User {
    message: string
    accessToken: string
    user: NextAuthUser
  }
  interface Session {
    accessToken: string | unknown
    user: NextAuthUser | unknown
  }
}
