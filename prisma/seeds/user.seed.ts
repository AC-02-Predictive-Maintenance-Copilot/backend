import { hashPassword } from '../../src/lib/bcrypt';
import prisma from '../../src/lib/prisma';

async function seedAdmin() {
	const hashedPassword = await hashPassword({ password: 'admin123' });

	const adminUser = await prisma.user.upsert({
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
		await prisma.$disconnect();
	});
