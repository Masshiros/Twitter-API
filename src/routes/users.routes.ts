import { Router } from 'express'
import {
  followController,
  forgotPasswordController,
  getMeController,
  getProfileController,
  loginController,
  logoutController,
  registerController,
  resendVerifyEmailController,
  resetPasswordController,
  unfollowController,
  updateMeController,
  verifyEmailController,
  verifyForgotPasswordController
} from '~/controllers/users.controllers'
import { filterMiddleware } from '~/middlewares/common.middlewares'
import {
  accessTokenValidator,
  changePasswordValidator,
  emailVerifyTokenValidator,
  followValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  resetPasswordValidator,
  unfollowValidator,
  updateMeValidator,
  verifiedUserValidator,
  verifyForgotPasswordTokenValidator
} from '~/middlewares/users.middlewares'
import { UpdateMeReqBody } from '~/models/requests/User.requests'
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
 * DESC    Get my profile
 * Path:   /me
 * Method  GET
 * Header  {Authorization: Bearer <access_token>}\
 * Access  Login
 */
usersRouter.get('/me', accessTokenValidator, wrapRequestHandler(getMeController))

/**
 * DESC    Update my profile
 * Path:   /me
 * Method  PATCH
 * Header  {Authorization: Bearer <access_token>}
 * Body    UserSchema
 * Access  Login + Verify
 */
usersRouter.patch(
  '/me',
  accessTokenValidator,
  verifiedUserValidator,
  filterMiddleware<UpdateMeReqBody>(
    'name',
    'date_of_birth',
    'bio',
    'location',
    'website',
    'username',
    'avatar',
    'cover_photo'
  ),
  updateMeValidator,
  wrapRequestHandler(updateMeController)
)

/**
 * DESC    Get user profile by username
 * Path:   /:username
 * Method  GET
 */
usersRouter.get('/:username', wrapRequestHandler(getProfileController))

/**
 * DESC    Follow someone
 * Path:   /follow
 * Method  POST
 * Header  {Authorization: Bearer <access_token>}
 * Body:   {followed_user_id: string}
 * Access  Login + Verified
 */
usersRouter.post(
  '/follow',
  accessTokenValidator,
  verifiedUserValidator,
  followValidator,
  wrapRequestHandler(followController)
)
/**
 * DESC    Unfollow someone
 * Path:   /follow/:user_id
 * Method  DELETE
 * Header  {Authorization: Bearer <access_token>}
 * Access  Login + Verified
 */
usersRouter.delete(
  '/follow/:user_id',
  accessTokenValidator,
  verifiedUserValidator,
  unfollowValidator,
  wrapRequestHandler(unfollowController)
)

/**
 * DESC    Change password
 * Path:   /change-password
 * Method  PUT
 * Header  {Authorization: Bearer <access_token>}
 * Access  Login + Verified
 */
usersRouter.delete(
  '/change-password',
  accessTokenValidator,
  verifiedUserValidator,
  changePasswordValidator,
  wrapRequestHandler(unfollowController)
)

export default usersRouter
