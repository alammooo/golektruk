import { ObjectEntry, OutputType } from "@/types/analytic.types"

type CountsByScope = {
  [key: string]: number[]
}

export function combineArraysByScope(
  arrays: (ObjectEntry[] | undefined)[]
): OutputType {
  const arrScopeValue: ObjectEntry[] = arrays
    .filter(Boolean)
    .flatMap((arr) => arr || [])

  const countsByScope: CountsByScope = {}

  arrScopeValue.forEach(({ scope, count }) => {
    countsByScope[scope] = countsByScope[scope]
      ? [...countsByScope[scope], count]
      : [count]
  })

  const arrayOfArrays = Object.entries(countsByScope).map(([scope, counts]) => {
    const totalCount = counts.reduce((acc, curr) => acc + curr, 0)
    return [scope, totalCount, ...counts]
  })

  return arrayOfArrays
}
