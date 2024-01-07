import { DateFilter } from "@/components/pages/analytics/DateRange"
import { useEffect, useState } from "react"
import AnalyticTable from "./Table"
import { PlatformDropdown } from "./filters/PlatformDropdown"
import { UserDropdown } from "./filters/UserDropdown"
import { Input } from "@/components/ui/input"
import { useQueries } from "@tanstack/react-query"
import { AnalyticFn } from "@/query/AnalyticFn"
import { combineArraysByScope } from "@/utils/dataMapper"
import dayjs from "dayjs"

const today = dayjs().format("YYYY-MM-DD")

export default function DatePage() {
  const [dateStrInt, setDateStrInt] = useState<string[]>([today])

  const analyticQuery = useQueries({
    queries: dateStrInt.map((date) => {
      return {
        queryKey: ["user", date],
        queryFn: () => AnalyticFn.fetchData(date),
      }
    }),
    combine: (results) => {
      return {
        data: combineArraysByScope(results.map((result) => result.data)),
        pending: results.some((result) => result.isPending),
      }
    },
  })

  // useEffect(() => {
  //   if (analyticQuery.pending === false) {
  //     setAnalyticData(combineArraysByScope(analyticQuery?.data))
  //   }
  // }, [analyticQuery])

  // const getWithPromiseAll = async (dateArray: string[]) => {
  //   try {
  //     console.time("promise all")
  //     let data = await Promise.all(
  //       dateArray.map(async (d) => {
  //         return await fetchData(d)
  //       })
  //     )

  //     setDateStrInt(dateInterval)
  //     setAnalyticData(combineArraysByScope(data))

  //     console.timeEnd("promise all")
  //   } catch (error) {
  //     throw error
  //   }
  // }

  // useEffect(() => {
  //   getWithPromiseAll(dateInterval)
  // }, [date])

  return (
    <section className='bg-gray-50 dark:bg-gray-900 p-3 sm:p-5'>
      <div className='mx-auto w-full md:w-4/5'>
        <div
          className={`bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden ${
            analyticQuery?.pending ? "opacity-50" : ""
          }`}>
          {analyticQuery?.pending && (
            <div
              role='status'
              className='absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2'>
              <svg
                aria-hidden='true'
                className='w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
              <span className='sr-only'>Loading...</span>
            </div>
          )}
          <div className='flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4'>
            <div className='flex items-center gap-3 flex-col md:flex-row'>
              <p className='font-bold'>Filter </p>
              <div className='flex items-center gap-2 md:gap-7 flex-col md:flex-row'>
                <DateFilter setDateStrInt={setDateStrInt} />
                <PlatformDropdown />
                <UserDropdown />
                <Input
                  type='text'
                  placeholder='Search by scope ...'
                />
              </div>
            </div>
            <button
              type='button'
              className='w-full md:w-fit flex items-center justify-center text-white bg-zinc-700 hover:bg-zinc-800 focus:ring-4 focus:ring-zinc-300 font-medium rounded-lg text-sm px-4 py-2'>
              <svg
                className='h-3.5 w-3.5 mr-2'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden='true'>
                <path
                  clipRule='evenodd'
                  fillRule='evenodd'
                  d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
                />
              </svg>
              Export Laporan
            </button>
          </div>
          <AnalyticTable
            analyticData={analyticQuery?.data}
            dateStrInt={dateStrInt}
          />
        </div>
      </div>
    </section>
  )
}
