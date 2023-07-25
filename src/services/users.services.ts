import { tokenType } from '~/constants/enums'
import { registerReqBody } from '~/models/requests/User.requests'
import User from '~/models/schemas/User.schema'
import databaseService from '~/services/database.services'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
import { config } from 'dotenv'
config()
class UserService {
  // access_token
  private signAccessToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: tokenType.AccessToken
      },
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN
      }
    })
  }
  // refresh token
  private signRefreshToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: tokenType.RefreshToken
      },
      options: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN
      }
    })
  }
  // sign access and refresh token
  private signAccessAndRefreshToken(user_id: string) {
    return Promise.all([this.signAccessToken(user_id), this.signRefreshToken(user_id)])
  }
  async register(payload: registerReqBody) {
    const result = await databaseService.users.insertOne(
      new User({
        ...payload,
        // overwrite date_of_birth + password for hashing purpose
        date_of_birth: new Date(payload.date_of_birth),
        password: hashPassword(payload.password)
      })
    )
    // get user_id by result
    const user_id = result.insertedId.toString()
    // get tokens
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken(user_id)

    return {
      access_token,
      refresh_token
    }
  }
  // check email exist
  async checkExistedEmail(email: string) {
    const result = await databaseService.users.findOne({
      email
    })
    return Boolean(result)
  }
  // login
  async login(user_id: string) {
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken(user_id)

    return {
      access_token,
      refresh_token
    }
  }
}
const userService = new UserService()
export default userService
