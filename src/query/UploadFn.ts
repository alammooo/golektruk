import { apiUrl } from "@/utils/apiUrl"
import axios from "axios"

export class UploadFn {
  static async post(formData: FormData) {
    try {
      const response = await axios.post(
        `${apiUrl}/user/photo/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      return response.data
    } catch (error) {
      throw error
    }
  }
}
