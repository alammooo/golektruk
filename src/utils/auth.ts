// auth.ts

import { NextApiRequest } from "next"

export const checkAuth = (req: NextApiRequest): boolean => {
  // Replace this with your authentication logic
  // For example, checking if the user has a token in the cookie or session
  // or checking if the access token exists in localStorage

  // For demonstration purposes, we'll check for the access token in localStorage
  if (typeof window !== "undefined") {
    const accessToken = localStorage.getItem("access_token")
    return !!accessToken
  }

  // If running on the server, handle authentication logic differently
  const { token } = req.cookies ?? {}
  return !!token // Return true if the token exists, otherwise false
}
