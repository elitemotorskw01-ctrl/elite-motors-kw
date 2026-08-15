import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const admin = await verifyAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Current and new passwords are required" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const adminRecord = await prisma.admin.findUnique({
      where: { id: admin.adminId },
    });

    if (!adminRecord) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    const valid = await bcrypt.compare(currentPassword, adminRecord.password);
    if (!valid) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 401 }
      );
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.admin.update({
      where: { id: admin.adminId },
      data: { password: hashed },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
