import { apiUrl } from "@/utils/apiUrl"
import axios from "axios"

export class UploadFn {
  static async post(formData: FormData) {
    try {
      const response = await axios.post("/user/photo/upload", formData)
      return response.data
    } catch (error) {
      console.log(error, "ERROR FROM UPLOAD")
      throw error
    }
  }
}
