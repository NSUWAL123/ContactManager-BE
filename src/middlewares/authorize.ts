import { NextFunction, Response } from "express";
import { AuthRequest, DataStoredInToken } from "../domain/user";
import jwt from "jsonwebtoken";
import CustomError from "../misc/CustomError";
import { StatusCodes } from "http-status-codes";


export const authorize = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization?.split(" ")[1];
    try {
        const payload = jwt.verify(accessToken as string, process.env.JWT_SECRET as string) as DataStoredInToken;

        req.authUser = payload.id;
        next();
    }
    catch (err) {
        next(new CustomError('Access Token Does not Exist', StatusCodes.UNAUTHORIZED));
    }
}