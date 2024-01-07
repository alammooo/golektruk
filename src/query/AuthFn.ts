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
      const response = await axios.post(`/user`, payload)

      return response.data
    } catch (error) {
      throw error
    }
  }

  static async login(payload: RegisterInput): Promise<LoginResponse> {
    try {
      const response = await axios.post(`/login`, payload)
      sessionStorage.setItem("access_token", response.data.access_token)
      return response.data
    } catch (error) {
      throw error
    }
  }
}
