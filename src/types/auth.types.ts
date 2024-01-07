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

export type LoginResponse = {
  access_token: string
  token_type: string
}

export type RegisterResponse = {
  email: string
  name: string
  phone: string
  password: string
  age: number
  photos: string[]
}

export type LoginError = {
  response: {
    data: {
      detail: {
        code: string
      }
    }
    status: number
    statusText: string
  }
}

export type RegisterError = {
  response: {
    data: {
      detail: any
    }
    status: number
    statusText: string
  }
}
