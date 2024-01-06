import { RegisterInput } from "@/types/auth.types"
import { apiUrl } from "@/utils/apiUrl"
import axios from "axios"

export class AuthFn {
  static async register(payload: RegisterInput) {
    try {
      const response = await axios.post(`${apiUrl}/user`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      return response.data
    } catch (error) {
      throw error
    }
  }

  static async login(payload: RegisterInput) {
    try {
      const response = await axios.post(`${apiUrl}/login`, payload, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })

      return response.data
    } catch (error) {
      throw error
    }
  }
}
