import { IUser } from "./user/user.type"

export interface IError {
  status?: number
  message?: string
}

export interface UserRequestInfo {
  user: IUser
  accessToken: string
}
