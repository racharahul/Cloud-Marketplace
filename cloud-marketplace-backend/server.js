import express from "express";
import cors from "cors";
import db from "./database.js";
import authRoutes from "./authRoutes.js";
import authMiddleware from "./authMiddleware.js";

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json());

// 🔁 Rollback: Remove /api prefix
app.use(authRoutes);

app.get("/", (req, res) => {
  res.send("This is cloud-marketing place.");
});

app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 'Database Connected!' AS message");
    res.json(rows[0]);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to your profile", user: req.user });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
