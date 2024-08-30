import { PrismaClient } from '@prisma/client';
import Encrypt from '../src/utils/hash';

const prisma = new PrismaClient();
const encrypt = new Encrypt();

async function main() {
  const adminPassword = 'admin';
  const hashedPassword = encrypt.encryptPassword(adminPassword);

  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@admin.com',
      password: hashedPassword,
    },
  });

  const contacts = [
    {
      name: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
      birthDate: new Date('1990-01-01'),
      address: '123 Main St',
      email: 'john@example.com',
      userId: adminUser.id,
    },
    {
      name: 'Jane',
      lastName: 'Smith',
      phoneNumber: '0987654321',
      birthDate: new Date('1992-05-12'),
      address: '456 Elm St',
      email: 'jane@example.com',
      userId: adminUser.id,
    },
    {
      name: 'Alice',
      lastName: 'Johnson',
      phoneNumber: '1122334455',
      birthDate: new Date('1985-07-23'),
      address: '789 Oak St',
      email: 'alice@example.com',
      userId: adminUser.id,
    },
  ];

  await prisma.contact.createMany({
    data: contacts,
  });

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
