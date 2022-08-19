import { Login } from "../domain/Login";
import { Success } from "../domain/Success";
import { Token } from "../domain/Token";
import UserModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import logger from "../misc/logger";

export const login = async (loginInfo: Login): Promise<Success<Token>> => {
  //checking if the email is registered or not
  const user = await UserModel.getUserByEmail(loginInfo.email);
  
  //if unregistered user tries to login
  if (!user) {
    return {
      message: "User not registered yet!!!",
    };
  }

  //using bcrypt to check if input password matches with the password in the database
  const validPassword = await bcrypt.compare(loginInfo.password, user.password);

  if (!validPassword) {
    return {
      message: "Password is Incorrect!!!",
    };
  }

  logger.info("Goint to grant access token")

  const accessToken = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET as string
  );
  
  logger.info("Access token granted")

  return {
    data: {
      access: accessToken,
      id: user.id,
    },
    message: "User Logged In!",
  };
};
