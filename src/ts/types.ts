import { User } from './interfaces'

export type LogInData = Required<Pick<User, 'email' | 'password'>>
export type RegisterData = LogInData & { username: string }
export type UpdateData = Partial<User>
