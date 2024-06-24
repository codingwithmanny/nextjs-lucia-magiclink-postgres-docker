"use server";

// Imports
// =================================
import { z } from "zod";
import { eq } from "drizzle-orm";
import db from "@/lib/db/index";
import { magicLinkTable, userTable } from "@/lib/db/schema";
import jwt from "jsonwebtoken";
import { env } from "@/env";
import { FormSchemaSignUp } from "@/components/FormSignUp";
import { sendEmail } from "@/lib/email";

// Main Action
// =================================
export const signUp = async (values: z.infer<typeof FormSchemaSignUp>) => {
  try {
    const existingUser = await db.query.userTable.findFirst({
      where: (table) => eq(table.email, values.email),
    });

    let userId = existingUser?.id ?? "";

    if (!existingUser) {
      const createUser = await db
        .insert(userTable)
        .values({
          name: values.name,
          email: values.email,
        })
        .returning({
          id: userTable.id,
          email: userTable.email,
        });

      userId = createUser?.[0].id;
    }

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
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
};
