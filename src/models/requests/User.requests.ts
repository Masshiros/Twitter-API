import { JwtPayload } from 'jsonwebtoken'
import { tokenType } from '~/constants/enums'

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
// manage token payload
export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: tokenType
}
