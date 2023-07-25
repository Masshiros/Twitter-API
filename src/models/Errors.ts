import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'

type ErrorsType = Record<string, { msg: string; [key: string]: any }> // {[key:string]:[key: string]: any }
// normal error with input status
export class ErrorWithStatus {
  private message: string
  private status: number
  constructor({ message, status }: { message: string; status: number }) {
    this.message = message
    this.status = status
  }
  public get Message() {
    return this.message
  }
  public set Message(message: string) {
    this.message = message
  }
  public get Status() {
    return this.status
  }
  public set Status(status: number) {
    this.status = status
  }
}
// validation error
export class EntityError extends ErrorWithStatus {
  errors: ErrorsType
  constructor({ message = USERS_MESSAGES.VALIDATION_ERROR, errors }: { message?: string; errors: ErrorsType }) {
    super({ message, status: HTTP_STATUS.UNPROCESSABLE_ENTITY })
    this.errors = errors
  }
}
