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
import { DataType } from "."

type Props = {
  setAnalyticData: Dispatch<SetStateAction<DataType[]>>
  className?: React.HTMLAttributes<HTMLDivElement>
}

export function DateFilter({ className, setAnalyticData }: Props) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  })

  const startDate = date?.from || new Date()
  const endDate = date?.to || startDate

  const dateInterval = useMemo(() => {
    return eachDayOfInterval({ start: startDate, end: endDate }).map((date) =>
      format(date, "yyy-MM-dd")
    )
  }, [startDate, endDate])

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
    console.time("promise all")
    let data = await Promise.all(
      dateArray.map(async (d) => {
        return await fetchData(d)
      })
    )

    setAnalyticData(data)
    console.timeEnd("promise all")
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
