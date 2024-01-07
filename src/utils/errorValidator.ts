type ErrorObject = {
  ctx: { [key: string]: any }
  input: string
  loc: [string, string]
  msg: string
  type: string
  url?: string
}

export function getErrorMessageByLoc(errors: ErrorObject[], targetLoc: string) {
  const error = errors.find((err: any) => {
    const [body, field] = err.loc
    return body === "body" && field === targetLoc
  })

  return error ? error.msg : undefined
}
