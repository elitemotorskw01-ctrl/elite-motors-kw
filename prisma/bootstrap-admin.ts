/**
 * Creates the admin account if it does not already exist.
 *
 * Safe to run against production — unlike `seed.ts`, this never deletes data.
 * Set ADMIN_USERNAME / ADMIN_PASSWORD in the environment to control the
 * credentials; otherwise it falls back to the development defaults.
 *
 *   npm run db:admin
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    console.error(
      "ADMIN_PASSWORD is not set. Refusing to create an admin account with a\n" +
        "default password on what may be a live database.\n\n" +
        "Run it like this instead:\n" +
        '  ADMIN_PASSWORD="your-strong-password" npm run db:admin'
    );
    process.exit(1);
  }

  const existing = await prisma.admin.findUnique({ where: { username } });

  if (existing) {
    console.log(`Admin "${username}" already exists — nothing to do.`);
    return;
  }

  await prisma.admin.create({
    data: { username, password: await bcrypt.hash(password, 12) },
  });

  console.log(`Admin "${username}" created.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
