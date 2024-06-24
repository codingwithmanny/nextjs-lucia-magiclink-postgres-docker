"use server";

// Imports
// =================================
import { z } from "zod";
import db from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { FormSchemaSignIn } from "@/components/FormSignIn";
import jwt from "jsonwebtoken";
import { env } from "@/env";
import { magicLinkTable } from "@/lib/db/schema";
import { sendEmail } from "@/lib/email";

// Main Action
// =================================
export const signIn = async (values: z.infer<typeof FormSchemaSignIn>) => {
  const existingUser = await db.query.userTable.findFirst({
    where: (table) => eq(table.email, values.email),
  });

  if (!existingUser) {
    return {
      error: "User not found.",
    };
  }

  const userId = existingUser.id;

  // Generate email code
  const code = Math.random().toString(36).substring(2, 8);

  const token = jwt.sign(
    { email: values.email, userId, code },
    env.JWT_SECRET!,
    {
      expiresIn: "5m",
    }
  );

  // Store in database
  await db.insert(magicLinkTable).values({
    userId,
    code: code,
  });

  const url = `${env.NEXT_PUBLIC_BASE_URL}/api/auth/email?token=${token}`;

  await sendEmail({
    to: values.email,
    subject: "Sign in to your account",
    html: `<p>Click here to sign in:<br/><a href="${url}">${url}</a></p>`,
  });

  return {
    success: true,
    data: {
      userId,
    },
  };
};
