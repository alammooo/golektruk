import { CalendarIcon } from "@radix-ui/react-icons"
import { eachDayOfInterval, format } from "date-fns"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react"

type Props = {
  setDateStrInt: Dispatch<SetStateAction<string[]>>
  className?: React.HTMLAttributes<HTMLDivElement>
  disabledState: boolean
}

export function DateFilter({ className, setDateStrInt, disabledState }: Props) {
  const [date, setDate] = useState<DateRange | undefined>()

  const startDate = date?.from
  const endDate = date?.to || startDate

  const dateInterval = useMemo(() => {
    if (startDate && endDate) {
      const dateArr = eachDayOfInterval({ start: startDate, end: endDate }).map(
        (date) => format(date, "yyy-MM-dd")
      )
      return dateArr
    }
    return [""]
  }, [startDate, endDate])

  useEffect(() => {
    if (dateInterval) {
      setDateStrInt(dateInterval)
    }
  }, [dateInterval])

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            disabled={disabledState}
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal disabled:cursor-not-allowed",
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
