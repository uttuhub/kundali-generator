import { users, kundaliRequests, type User, type InsertUser, type KundaliRequest, type InsertKundali, type UpdateKundali } from "@shared/schema";
import { db } from "./db-vercel";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createKundaliRequest(request: InsertKundali): Promise<KundaliRequest>;
  getKundaliRequest(id: number): Promise<KundaliRequest | undefined>;
  updateKundaliRequest(id: number, updates: Partial<UpdateKundali>): Promise<KundaliRequest | undefined>;
}

export class VercelStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, id));
      return user || undefined;
    } catch (error) {
      console.error('Database error:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.username, username));
      return user || undefined;
    } catch (error) {
      console.error('Database error:', error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createKundaliRequest(request: InsertKundali): Promise<KundaliRequest> {
    const [kundaliRequest] = await db
      .insert(kundaliRequests)
      .values(request)
      .returning();
    return kundaliRequest;
  }

  async getKundaliRequest(id: number): Promise<KundaliRequest | undefined> {
    try {
      const [kundaliRequest] = await db
        .select()
        .from(kundaliRequests)
        .where(eq(kundaliRequests.id, id));
      return kundaliRequest || undefined;
    } catch (error) {
      console.error('Database error:', error);
      return undefined;
    }
  }

  async updateKundaliRequest(id: number, updates: Partial<UpdateKundali>): Promise<KundaliRequest | undefined> {
    try {
      const [updated] = await db
        .update(kundaliRequests)
        .set(updates)
        .where(eq(kundaliRequests.id, id))
        .returning();
      return updated || undefined;
    } catch (error) {
      console.error('Database error:', error);
      return undefined;
    }
  }
}

export const storage = new VercelStorage();