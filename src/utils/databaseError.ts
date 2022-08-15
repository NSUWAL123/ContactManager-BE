import { StatusCodes } from "http-status-codes";
import CustomError from "../misc/CustomError";

export const databaseError = new CustomError("Database Error Occured", StatusCodes.BAD_REQUEST);