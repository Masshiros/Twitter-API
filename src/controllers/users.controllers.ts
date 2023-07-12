import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { registerReqBody } from '~/models/requests/User.requests'
import userService from '~/services/users.services'
export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  res.json({
    message: 'Login successfully'
  })
}
export const registerController = async (req: Request<ParamsDictionary, any, registerReqBody>, res: Response) => {
  try {
    const result = await userService.register(req.body)
    return res.json({
      message: 'Register successfully',
      result
    })
  } catch (error) {
    return res.status(400).json({
      message: 'Register failed',
      error
    })
  }
}
