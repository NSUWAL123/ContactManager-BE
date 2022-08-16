import { NextFunction, Request, Response } from "express";
import logger from "../misc/logger";
import * as userService from '../services/signupService'

export const signup = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    console.log({email})

    logger.info("Inside sigupController")
    userService
        .signup({ email, password})
        .then((data) => res.json(data))
        .catch((err) => next(err)) 
} 