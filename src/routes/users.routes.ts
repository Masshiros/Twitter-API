import { Router } from 'express'
import { loginController, logoutController, registerController } from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
const usersRouter = Router()
/**
 * DESC    Login
 * Path:   /login
 * Method  POST
 * Body:   { email: string, password: string}
 * Access  None
 */
usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))

/**
 * DESC    Register a new user
 * Path:   /register
 * Method  POST
 * Body:   {name: string, email: string, password: string, confirm_password: string, date_of_birth: ISO8601}
 * Access  None
 */
usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))
/**
 * DESC    Logout
 * Path:   /logout
 * Method  POST
 * Header  {Authorization: Bearer <access_token>}
 * Body:   { fresh_token: string}
 * Access  Login
 */
usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))
export default usersRouter
