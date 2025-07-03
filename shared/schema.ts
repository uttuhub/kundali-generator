import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const kundaliRequests = pgTable("kundali_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  gender: text("gender").notNull(),
  dateOfBirth: text("date_of_birth").notNull(),
  timeOfBirth: text("time_of_birth").notNull(),
  placeOfBirth: text("place_of_birth").notNull(),
  rashi: text("rashi"),
  nakshatra: text("nakshatra"),
  lagna: text("lagna"),
  rashiDescription: text("rashi_description"),
  nakshatraDescription: text("nakshatra_description"),
  lagnaDescription: text("lagna_description"),
  paymentStatus: text("payment_status").default("pending"),
  paymentId: text("payment_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertKundaliSchema = createInsertSchema(kundaliRequests).pick({
  name: true,
  gender: true,
  dateOfBirth: true,
  timeOfBirth: true,
  placeOfBirth: true,
});

export const updateKundaliSchema = createInsertSchema(kundaliRequests).pick({
  rashi: true,
  nakshatra: true,
  lagna: true,
  rashiDescription: true,
  nakshatraDescription: true,
  lagnaDescription: true,
  paymentStatus: true,
  paymentId: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertKundali = z.infer<typeof insertKundaliSchema>;
export type UpdateKundali = z.infer<typeof updateKundaliSchema>;
export type KundaliRequest = typeof kundaliRequests.$inferSelect;
