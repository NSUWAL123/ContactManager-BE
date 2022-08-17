import { Success } from "../domain/Success";
import { User, UserToInsert } from "../domain/user";
import bcrypt from "bcrypt";
import UserModel from "../models/userModel";
import logger from "../misc/logger";

export const signup = async (
  userInfo: UserToInsert
): Promise<Success<User>> => {
  logger.info("before password hash");
  const { password } = userInfo;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const createdUser = await UserModel.createUser({
    ...userInfo,
    password: hashedPassword,
  });
  logger.info("after password hash");

  return {
    data: createdUser,
    message: "New User Successfully Added!!!",
  };
};
