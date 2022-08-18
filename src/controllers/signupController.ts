import { Request, Response, NextFunction } from "express";
import * as userService from "../services/signupService";

export const signup = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  userService
    .signup({ email, password })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
