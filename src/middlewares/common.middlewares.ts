import { NextFunction, Request, Response } from 'express'
import { pick } from 'lodash'
type FilterKeys<T> = Array<keyof T>

export const filterMiddleware =
  <T>(...filterKey: FilterKeys<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    req.body = pick(req.body, filterKey)
    next()
  }
