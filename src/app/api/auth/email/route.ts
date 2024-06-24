// Imports
// =================================
import jwt from "jsonwebtoken";
import { env } from "process";
import db from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { magicLinkTable } from "@/lib/db/schema";
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers"

// Handlers
// =================================
export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token") || "";

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET!) as {
      email: string;
      userId: string;
      code: string;
      iat: number;
      exp: number;
    };

    const verifiedUser = await db.query.magicLinkTable.findFirst({
      where: (table) =>
        eq(table.userId, decoded.userId) && eq(table.code, decoded.code),
    });

    if (!verifiedUser) {
      throw Error("Invalid token.");
    }

    await db
      .delete(magicLinkTable)
      .where(eq(magicLinkTable.userId, decoded.userId));

    // @TODO: create session
    const session = await lucia.createSession(decoded.userId, {
      expiresIn: 60 * 60 * 24 * 30,
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return NextResponse.redirect(
      `${env.NEXT_PUBLIC_BASE_URL}`
    );
  } catch (error: unknown) {
    return NextResponse.redirect(
      `${env.NEXT_PUBLIC_BASE_URL}/auth/error?message=Invalid token.`
    );
  }
};
