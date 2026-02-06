// import { PrismaClient,Prisma } from "@/prisma/generated/client";

// const prisma = new PrismaClient();
// let user:Prisma.UserCreateInput

// async function seedUsers() {
//      user = {
//       email: 'elsa@prisma.io',
//       name: 'Piyush Raut',
//       posts: {
//         create: {
//           title: 'Include this post!',
//         },
//       },
//     }
//     const createMany = await prisma.user.createMany({
//         da: [
//             { name: 'Bob', email: 'bob@prisma.io' },
//             { name: 'Bobo', email: 'bob@prisma.io' }, // Duplicate unique key!
//             { name: 'Yewande', email: 'yewande@prisma.io' },
//             { name: 'Angelique', email: 'angelique@prisma.io' },
//         ],
//         skipDuplicates: true, // Skip 'Bobo'
//     })
// }