import { Login } from '../domain/Login'
import { Success } from '../domain/Success'
import { Token } from '../domain/Token'
import UserModel from '../models/userModel'
import bcrypt from 'bcrypt'


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

    //jwt token deu

    return {
        // data: {
        //     access: accessToken,
        //     user_id: user.user_id,
        // },
        // message: "User Logged In!",
    }
}