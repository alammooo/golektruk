import { useEffect } from "react"

const useAccessToken = (): void => {
  useEffect(() => {
    const checkAccessToken = () => {
      if (typeof window === "undefined") {
        // If the code is running on the server-side, ignore
        return
      }

      const accessToken = sessionStorage.getItem("access_token")

      if (!accessToken) {
        // Redirect the user to a login page or display an error message
        // Here's an example of redirecting to a login page
        window.location.href = "/login"
      }
    }

    checkAccessToken()
  }, [])
}

export default useAccessToken
