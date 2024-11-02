// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy reports
  await prisma.report.create({
    data: {
      title: 'First Report',
      description: 'This is the first report',
      authorName: 'John Doe',
      authorAge: 20,
    },
  });

  await prisma.report.create({
    data: {
      title: 'Second Report',
      description: 'This is the second report',
      authorName: 'Jan Novák',
      authorAge: 25,
    },
  });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
