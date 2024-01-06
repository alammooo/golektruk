export type RegisterInput = {
  email?: string
  name?: string
  password?: string
  phone?: string
  age?: number
  photos?: string[]
}

export type LoginInput = {
  username: string
  password: string
}
