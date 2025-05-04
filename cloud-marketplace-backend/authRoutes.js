import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "./database.js";
import authMiddleware from "./authMiddleware.js";

const router = express.Router();
const JWT_SECRET = "your_jwt_secret";

// Register
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const validRoles = ["buyer", "seller"];
  if (!validRoles.includes(role.toLowerCase())) {
    return res.status(400).json({ message: "Invalid role selected" });
  }

  try {
    const [existingUsers] = await db.query(
      "SELECT role FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      const existingRoles = existingUsers.map((user) => user.role);
      if (existingRoles.includes(role.toLowerCase())) {
        return res.status(400).json({
          message: `Email is already registered as a ${role}. Please log in instead.`,
        });
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role.toLowerCase()]
    );

    res.status(201).json({ message: `Registered successfully as a ${role}.` });
  } catch (error) {
    console.error("Error in /register:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({
      message: "Email, password, and role are required",
    });
  }

  try {
    const [users] = await db.query(
      "SELECT * FROM users WHERE email = ? AND role = ?",
      [email, role.toLowerCase()]
    );

    if (users.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid email, role, or password" });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token, role: user.role });
  } catch (error) {
    console.error("Error in /login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add product
router.post("/products", authMiddleware, async (req, res) => {
  const { role, id } = req.user;

  if (role !== "seller") {
    return res.status(403).json({ message: "Only sellers can add products" });
  }

  const { title, price, description } = req.body;
  if (!title || !price || !description) {
    return res.status(400).json({ message: "All product fields are required" });
  }

  try {
    await db.query(
      "INSERT INTO products (seller_id, title, price, description) VALUES (?, ?, ?, ?)",
      [id, title, price, description]
    );
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Error in /products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get seller's products
router.get("/my-products", authMiddleware, async (req, res) => {
  const { role, id } = req.user;

  if (role !== "seller") {
    return res
      .status(403)
      .json({ message: "Only sellers can view their products" });
  }

  try {
    const [products] = await db.query(
      "SELECT id, title, price, description FROM products WHERE seller_id = ?",
      [id]
    );
    res.json(products);
  } catch (error) {
    console.error("Error in GET /my-products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
