import { Request } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

import getToken from '@utils/getToken'

import UserRepository from '@repository/userRepository'

import { env } from '@shared/env'

interface IUser extends JwtPayload {
  id: number
  name: string
}

export default class checkUserService {
  static async execute(req: Request) {
    let currentUser: IUser | null = null

    if (req.headers.authorization) {
      const token = getToken(req)
      const decoded = jwt.verify(token, env.JWT_SECRET) as IUser

      currentUser = await UserRepository.findById(decoded.id)
      if (currentUser) {
        currentUser.password = undefined
      }
    } else {
      currentUser = null
    }

    return currentUser
  }
}
