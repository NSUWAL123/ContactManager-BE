import { NextFunction, Request, Response } from "express";
import CustomError from "../misc/CustomError";
import { StatusCodes } from "http-status-codes";

/**
 * Middleware to handle invalid routes
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new CustomError(
    `Not Found - ${req.originalUrl}`,
    StatusCodes.NOT_FOUND
  );
  next(error);
};
