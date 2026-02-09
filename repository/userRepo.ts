// import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient, Prisma } from '../prisma/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
    adapter,
});

let user: Prisma.UserCreateInput;

export default class UserRepo {
    async createUser(data: { username: string, email: string, password: string }) {
        try {
            const user = data;
            const createUser = await prisma.user.createManyAndReturn({
                data: [user], omit: {
                    email: true,
                    name: true
                }
            });
            return createUser;
        } catch (error) {
            console.log("error in repo : " + error);
            throw error;
        }
    }

    async searchUser(data: string) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: data,
                },
                omit: {
                    email: true,
                    name: true
                }
            })
            return user;
        } catch (error) {
            console.log("error in repo : " + error);
            throw error;
        }
    }
}