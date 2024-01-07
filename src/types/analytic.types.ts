export enum UserType {
  LOGIN = "login",
  GUEST = "guest",
}

export enum PlatformType {
  DESKTOP = "desktop",
  RESPONSIVE = "responsive",
  MOBILE = "mobile",
}

export type ObjectEntry = {
  scope: string
  count: number
}

export type OutputType = (string | number)[][]

export type FetchInput = {
  scope?: string
  userType?: string
  platformType?: string
  listingDate?: string
  accessToken?: string
}
