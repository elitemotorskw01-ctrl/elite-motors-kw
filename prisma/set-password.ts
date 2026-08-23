import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
async function main() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error("ADMIN_PASSWORD not set");
  const hash = await bcrypt.hash(password, 12);
  const r = await prisma.admin.upsert({
    where: { username: "admin" },
    update: { password: hash },
    create: { username: "admin", password: hash },
  });
  console.log("admin password set for:", r.username);
}
main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
