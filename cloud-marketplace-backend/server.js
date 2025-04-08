import express from "express";
import cors from "cors"; // ✅ Import CORS
import db from "./database.js";
import authRoutes from "./authRoutes.js";
import authMiddleware from "./authMiddleware.js";

const app = express();
const PORT = 5000;

// ✅ Enable CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from frontend
    methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Allowed headers
  })
);

app.use(express.json());
app.use(authRoutes);

// Test database connection
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

// ✅ Protected Route (Requires Authentication)
app.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to your profile", user: req.user });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
