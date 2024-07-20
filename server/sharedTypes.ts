import { insertExpensesSchema } from "./db/schema/expenses";

export const createExpenseSchema = insertExpensesSchema.omit({
  id: true,
  userId: true,
  cratedAt: true,
});
