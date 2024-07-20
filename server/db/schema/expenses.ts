import {
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const expenses = pgTable(
  "expenses",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    title: text("title").notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    cratedAt: timestamp("created_at").defaultNow(),
  },
  (expenses) => {
    return {
      userIdIndex: uniqueIndex("name_idx").on(expenses.userId),
    };
  }
);
