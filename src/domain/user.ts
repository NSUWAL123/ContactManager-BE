export interface User {
    id: number;
    email: string;
    password: string;
}

export type UserToInsert = Omit<User, "id">;
export type UserInsertedResponse = Omit<User, "password">;