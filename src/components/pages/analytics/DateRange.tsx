import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, eachDayOfInterval, format } from "date-fns"
import { DateRange } from "react-day-picker"
import dayjs from "dayjs"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react"
import axios from "axios"
import { apiUrl } from "@/utils/apiUrl"
import { DataType, ObjType, OutputType } from "."

type Props = {
  setAnalyticData: Dispatch<SetStateAction<OutputType>>
  setDateStrInt: Dispatch<SetStateAction<string[]>>
  className?: React.HTMLAttributes<HTMLDivElement>
}

type ObjectEntry = {
  scope: string
  count: number
}

type CountsByScope = {
  [key: string]: number[]
}

export function DateFilter({
  className,
  setAnalyticData,
  setDateStrInt,
}: Props) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  })

  const startDate = date?.from || new Date()
  const endDate = date?.to || startDate

  const dateInterval = useMemo(() => {
    const dateArr = eachDayOfInterval({ start: startDate, end: endDate }).map(
      (date) => format(date, "yyy-MM-dd")
    )
    return dateArr
  }, [startDate, endDate])

  function combineArraysByScope(arrays: DataType[]): OutputType {
    // const combinedData: { [key: string]: number[] } = {}
    const arrScopeValue: ObjectEntry[] = []
    arrays.forEach((arr) => {
      arr.forEach((item) => {
        arrScopeValue.push(item)
      })
    })

    const countsByScope: CountsByScope = {}

    // Iterate through the objects to aggregate counts based on scope
    arrScopeValue.forEach((obj) => {
      const { scope, count } = obj
      if (countsByScope[scope]) {
        countsByScope[scope].push(count)
      } else {
        countsByScope[scope] = [count]
      }
    })

    // Convert the counts into an array of arrays
    const arrayOfArrays = Object.entries(countsByScope).map(
      ([scope, counts]) => {
        const totalCount = counts.reduce((acc, curr) => acc + curr, 0)
        return [scope, totalCount, ...counts]
      }
    )
    // console.log(arrayOfArrays, "HALLO ARRAY F ARRAYS✅✅✅✅")

    return arrayOfArrays
  }

  async function fetchData(dateString: string) {
    try {
      const response = await axios.get(
        `${apiUrl}/analytic/click?listing_date=${dateString}`,
        {
          headers: {
            // Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImFmZDkzNGE2ZTQ5OTg1ZTEwM2Y2OGYyMTUzYmQ1MTEyM2RiNzJkZWZiY2Q1Zjg5Zjc2OTNjM2M5Yjc3YjkzMzc0MzI2MGJmYzM1YzI3MzA1ZmI4MDAxMGExZDhiMDkxMWVhMjE4ZDEyNmJhMzAxM2JmNGFhY2VhZDFkMWM4Mjk1In0.dHljRLagUIxoQWJcrevlG9isAPRRyOvOdPJZtDqyJWY`,
          },
        }
      )

      return response.data
    } catch (error) {
      throw error
    }
  }

  const getWithPromiseAll = async (dateArray: string[]) => {
    try {
      console.time("promise all")
      let data = await Promise.all(
        dateArray.map(async (d) => {
          return await fetchData(d)
        })
      )

      setDateStrInt(dateInterval)
      setAnalyticData(combineArraysByScope(data))

      // console.log(combineArraysByScope(data), "HALLO ARRAY F ARRAYS✅✅✅✅")
      console.timeEnd("promise all")
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    getWithPromiseAll(dateInterval)
  }, [date])

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}>
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='w-auto p-0'
          align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

// {scope: 'a', count: 3053}
// {scope: 'b', count: 4212}
// {scope: 'c', count: 2954}
// {scope: 'd', count: 1880}
// {scope: 'e', count: 3999}
// {scope: 'f', count: 3687}
// {scope: 'g', count: 2332}
// {scope: 'h', count: 1881}
// {scope: 'i', count: 1234}
// {scope: 'j', count: 4159}
// {scope: 'a', count: 2749}
// {scope: 'b', count: 2537}
// {scope: 'c', count: 3496}
// {scope: 'd', count: 2701}
// {scope: 'e', count: 2294}
// {scope: 'f', count: 3527}
// {scope: 'g', count: 2769}
// {scope: 'h', count: 2729}
// {scope: 'i', count: 3497}
// {scope: 'j', count: 2341}
