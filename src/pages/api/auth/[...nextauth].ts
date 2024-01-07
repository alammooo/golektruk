import { apiUrl } from "@/utils/apiUrl"
import axios from "axios"
import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 28800,
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const res = await axios.post(`${apiUrl}/login`, credentials)
          const serverCredentials = res.data
          if (serverCredentials) {
            delete serverCredentials.user.password
            return serverCredentials
          }
        } catch (error) {
          throw error
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return "/"
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account) {
        token.accessToken = user.accessToken
        token.user = user.user
      }
      return token
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken
      session.user = token.user

      return session
    },
  },
}

export default NextAuth(authOptions)
