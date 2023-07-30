import express from 'express'
import { body, validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema'
import HTTP_STATUS from '~/constants/httpStatus'
import { EntityError, ErrorWithStatus } from '~/models/Errors'
// can be reused by many routes

// sequential processing, stops running validations chain if the previous one fails.
export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await validation.run(req)
    const errors = validationResult(req)

    if (errors.isEmpty()) {
      return next()
    }
    // list the errors by object
    const errorObjects = errors.mapped()

    // list of validation errors
    const entityError = new EntityError({ errors: {} })
    // each object of array has a value named "msg".
    // This is the error that set by the validations
    for (const key in errorObjects) {
      const { msg } = errorObjects[key]
      // normal error with input status
      if (msg instanceof ErrorWithStatus && msg.Status !== HTTP_STATUS.UNPROCESSABLE_ENTITY) {
        return next(msg)
      }
      // validation error
      entityError.errors[key] = errorObjects[key]
    }
    next(entityError)
  }
}
