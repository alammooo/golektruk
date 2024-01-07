import { ObjectEntry } from "@/types/analytic.types"
import { apiUrl } from "@/utils/apiUrl"
import axios from "axios"


export class AnalyticFn {
  static async fetchData(dateString: string): Promise<ObjectEntry[]> {
    const access_token = localStorage.getItem("access_token")
    try {
      const response = await axios.get(
        `${apiUrl}/analytic/click?listing_date=${dateString}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )

      // console.log(response.data, "HALLO DATA")
      return response.data
    } catch (error) {
      throw error
    }
  }
}
