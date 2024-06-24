// Imports
// =================================
import { sql } from "drizzle-orm";
import { text, pgTableCreator, timestamp } from "drizzle-orm/pg-core";

// Config
// =================================
/**
 *
 */
export const createTable = pgTableCreator((name) => name);

// Tables
// =================================
/**
 * Main user table
 */
export const userTable = createTable("user", {
  id: text("id")
    .default(sql`gen_random_uuid()`)
    .notNull()
    .primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
});

/**
 * Main session table
 */
export const sessionTable = createTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

/**
 * For creating unique magic link tokens
 */
export const magicLinkTable = createTable("magic_link", {
  id: text("id")
    .default(sql`gen_random_uuid()`)
    .notNull()
    .primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  code: text("code").notNull(),
});
