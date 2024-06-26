import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedRoles() {
  try {
    await prisma.role.upsert({
      where: { name: 'Super Administrador' },
      update: {},
      create: { name: 'Super Administrador' },
    });

    await prisma.role.upsert({
      where: { name: 'Administrador' },
      update: {},
      create: { name: 'Administrador' },
    });

    await prisma.role.upsert({
      where: { name: 'Usuario' },
      update: {},
      create: { name: 'Usuario' },
    });

    console.log('Roles insertados');
  } catch (error) {
    console.error('Error al insertar los roles:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedRoles();
