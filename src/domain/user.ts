import { Request } from "express";

export interface User {
  id: number;
  email: string;
  password: string;
}

interface AuthorizeRequest extends Request {
  authUser?: number;
}

interface TokenPayload {
  id: number;
}

export type UserToInsert = Omit<User, "id">;
export type AuthRequest = AuthorizeRequest;
export type DataStoredInToken = TokenPayload;
