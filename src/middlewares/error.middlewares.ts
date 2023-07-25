import { Request, Response, NextFunction } from 'express'
import { omit } from 'lodash'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Errors'

export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorWithStatus) {
    return res.status(err.Status).json(omit(err, 'status'))
  }
  /**
   * When we throw an Error object, we only can access message property through . or []
   * We can not list these properties by iteration (like Object.entries(),for in, JSON.stringify())
   * Because of the ownership of properties
   */
  Object.getOwnPropertyNames(err).forEach((key) => {
    Object.defineProperty(err, key, { enumerable: true })
  })
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: err.message, errorInfo: omit(err, 'stack') })
}
