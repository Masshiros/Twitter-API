import { Router } from 'express'
import {
  forgotPasswordController,
  getMeController,
  loginController,
  logoutController,
  registerController,
  resendVerifyEmailController,
  resetPasswordController,
  verifyEmailController,
  verifyForgotPasswordController
} from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  emailVerifyTokenValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  resetPasswordValidator,
  verifyForgotPasswordTokenValidator
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

/**
 * DESC    Verify Email when user click on the link in email
 * Path:   /verify-email
 * Method  POST
 * Body:   {email_verify_token: string}
 */
usersRouter.post('/verify-email', emailVerifyTokenValidator, wrapRequestHandler(verifyEmailController))

/**
 * DESC    Resend verify email
 * Path:   /resend-verify-email
 * Method  POST
 * Header  {Authorization: Bearer <access_token>}
 * Access  Login
 */
usersRouter.post('/resend-verify-email', accessTokenValidator, wrapRequestHandler(resendVerifyEmailController))

/**
 * DESC    Send email to reset password
 * Path:   /forgot-password
 * Method  POST
 * Body    {email:string}
 */
usersRouter.post('/forgot-password', forgotPasswordValidator, wrapRequestHandler(forgotPasswordController))

/**
 * DESC    Verify link in email to reset password
 * Path:   /verify-forgot-password
 * Method  POST
 * Body    {forgot_password_token:string}
 */
usersRouter.post(
  '/verify-forgot-password',
  verifyForgotPasswordTokenValidator,
  wrapRequestHandler(verifyForgotPasswordController)
)
/**
 * DESC    Reset password after input new_password
 * Path:   /reset-password
 * Method  POST
 * Body    {forgot_password_token:string,new_password: string,confirm_new_password:string}
 */
usersRouter.post('/reset-password', resetPasswordValidator, wrapRequestHandler(resetPasswordController))
/**
 * DESC    Get user profile
 * Path:   /me
 * Method  GET
 * Header  {Authorization: Bearer <access_token>}
 */
usersRouter.get('/me', accessTokenValidator, wrapRequestHandler(getMeController))

export default usersRouter
