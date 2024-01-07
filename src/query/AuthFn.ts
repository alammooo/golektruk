import {
  LoginError,
  LoginResponse,
  RegisterInput,
  RegisterResponse,
} from "@/types/auth.types"
import { apiUrl } from "@/utils/apiUrl"
import axios from "axios"

export class AuthFn {
  static async register(payload: RegisterInput): Promise<RegisterResponse> {
    try {
      const response = await axios.post(`${apiUrl}/user`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      return response.data
    } catch (error) {
      // console.log(error, "🔴🔴🔴🔴🔴🔴🔴 FROM REGISTER")
      throw error
    }
  }

  static async login(payload: RegisterInput): Promise<LoginResponse> {
    try {
      const response = await axios.post(`${apiUrl}/login`, payload, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      sessionStorage.setItem("access_token", response.data.access_token)
      return response.data
    } catch (error) {
      throw error
    }
  }
}
