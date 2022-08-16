import { Login } from '../domain/Login'
import { Success } from '../domain/Success'
import { Token } from '../domain/Token'
import UserModel from '../models/userModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const login = async (loginInfo: Login): Promise<Success<Token>> => {

    const user = await UserModel.getUserByEmail(loginInfo.email);
    if (!loginInfo.email || !loginInfo.password) {
        return {
            message: "Invalid user credentials",
        }
    }

    const validPassword = await bcrypt.compare(loginInfo.password, user.password);

    if (!validPassword) {
        return {
            message: "Password is Incorrect!!!"
        }
    }

    //giving access token
    const accessToken = jwt.sign(
        {id: user.id,}, 
        process.env.JWT_SECRET as string
    )

    return {
        data: {
            access: accessToken,
            id: user.id,
        },
        message: "User Logged In!",
    }
}