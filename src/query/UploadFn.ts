import { apiUrl } from "@/utils/apiUrl"
import axios from "axios"

export class UploadFn {
  static async post(formData: FormData) {
    try {
      const response = await axios.post("/user/photo/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return response.data
    } catch (error) {
      console.log(error, "ERROR FROM UPLOAD")
      throw error
    }
  }
}
