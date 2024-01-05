import { RegisterInput } from "@/components/pages/register"
import { apiUrl } from "@/utils/apiUrl"
import axios from "axios"

export class RegisterFn {
  static async create(payload: RegisterInput) {
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
}
