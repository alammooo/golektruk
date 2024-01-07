import { FetchInput, ObjectEntry } from "@/types/analytic.types"
import { apiUrl } from "@/utils/apiUrl"
import axios from "axios"

export class AnalyticFn {
  static async fetchData(payload: FetchInput): Promise<ObjectEntry[]> {
    const access_token = sessionStorage.getItem("access_token")
    try {
      const response = await axios.get("/analytic/click", {
        params: {
          platform: payload.platformType || undefined,
          user_type: payload.userType || undefined,
          listing_date: payload.listingDate || undefined,
          scope: payload.scope || undefined,
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })

      return response.data
    } catch (error) {
      throw error
    }
  }
}
