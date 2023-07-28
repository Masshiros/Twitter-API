import { JwtPayload } from 'jsonwebtoken'
import { tokenType } from '~/constants/enums'
export interface LoginReqBody {
  email: string
  password: string
}
// modify the body when we call register controller for easier control
export interface RegisterReqBody {
  name: string
  email: string
  password: string
  confirm_password: string
  date_of_birth: string
}
// manage logout in req.body
export interface LogoutReqBody {
  refresh_token: string
}
export interface VerifyEmailReqBody {
  email_verify_token: string
}
export interface ForgotPasswordReqBody {
  email: string
}
export interface VerifyForgotPasswordReqBody {
  forgot_password_token: string
}
export interface ResetPasswordReqBody {
  forgot_password_token: string
  password: string
  confirm_password: string
}
// manage token payload
export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: tokenType
}
