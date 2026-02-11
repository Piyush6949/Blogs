import UserRepository from "@/repository/userRepo"
import bcrypt from 'bcrypt'
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import 'dotenv/config'
import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";

const secretKey = process.env.SECRET_KEY;

const User = new UserRepository;
class UserService {
    async createUser(data: { username: string, email: string, password: string }) {
        try {
            let { password } = data;
            password = await bcrypt.hash(password, 10);
            data.password = password;
            const res = await User.createUser(data);
            const result = res[0];
            result.password = "";
            await createSession(result);
            return result;
        } catch (error) {
            console.log("error in service layer");
            throw error;
        }
    }

    async searchUser(data: { email: string, password: string }) {
        try {
            const res = await User.searchUser(data.email);
            const { password } = data;
            if (res == null) {
                throw { error: "Email not found. Create a account first" };
            }
            else if (!(await bcrypt.compare(password, res.password))) {
                throw { error: "Wrong Password. Enter the correct password" };
            }
            res.password = "";
            await createSession(res);
            return res;
        } catch (error) {
            console.log("error in service layer");
            throw error;
        }
    }
}

export default UserService;