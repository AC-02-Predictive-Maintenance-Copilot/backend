"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("../../src/lib/bcrypt");
const prisma_1 = __importDefault(require("../../src/lib/prisma"));
async function seedAdmin() {
    const hashedPassword = await (0, bcrypt_1.hashPassword)({ password: 'admin123' });
    const adminUser = await prisma_1.default.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            name: 'Super Admin',
            username: 'admin',
            email: 'admin@example.com',
            password: hashedPassword,
            isVerified: true,
            role: 'ADMIN',
            picture: null,
        },
    });
    console.log('Admin user created:', adminUser);
}
seedAdmin()
    .catch((err) => {
    console.error(err);
    process.exit(1);
})
    .finally(async () => {
    await prisma_1.default.$disconnect();
});
