import { OutputType } from "@/types/analytic.types"

type Props = {
  analyticData: OutputType
  dateStrInt: string[]
}

export default function AnalyticTable({ analyticData, dateStrInt }: Props) {
  return (
    <div className='overflow-x-auto'>
      <table className='w-full text-sm text-left text-gray-500'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
          <tr>
            <th
              scope='col'
              className='px-4 py-3 whitespace-nowrap w-12'>
              Scope Name
            </th>
            <th
              scope='col'
              className='px-4 py-3 whitespace-nowrap'>
              Total
            </th>

            {dateStrInt?.map((e, i) => (
              <th
                key={i}
                scope='col'
                className='px-4 py-3 whitespace-nowrap'>
                {e || "Value"}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {analyticData?.map((data, i) => (
            <tr
              className='border-b dark:border-gray-700'
              key={i}>
              {data?.map((d, ii) => (
                <td
                  key={ii}
                  scope='row'
                  className={`px-4 py-3 text-gray-900 whitespace-nowrap ${
                    ii === 1 ? "font-semibold" : ""
                  }`}>
                  {d}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
