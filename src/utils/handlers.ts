import { Request, Response, NextFunction, RequestHandler } from 'express'

export const wrapRequestHandler = <T>(func: RequestHandler<T>) => {
  return async (req: Request<T>, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
