import { User, UserToInsert } from '../domain/user'
import db from '../db/db'

class UserModel {
    public static table = 'user_account';

    public static async getUserByEmail(email: string): Promise<User> {
        const user = await db(UserModel.table)
            .where({ email: email})
            .select()
            .first();

        return user;
    }

    public static async createUser(userInfo: UserToInsert): Promise<User[]> {
        const newUser = await db(UserModel.table)
            .insert(userInfo)
            .returning('*');
        
        return newUser;
    }
}

export default UserModel;