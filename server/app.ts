import { Hono } from "hono";
import { logger } from "hono/logger";
import { expensesRoute } from "./routes/expesesRoute";
const app = new Hono();

app.use("*", logger());
app.get("/test", (c) => c.json({ message: "Hono!" }));
app.route("/api/expenses", expensesRoute);

export default app;
