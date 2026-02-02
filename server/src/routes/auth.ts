import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users } from "../store.js";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "hirex-dev-secret";

router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = {
      id: String(users.length + 1),
      fullName: fullName || null,
      email: email.toLowerCase(),
      password: hashed,
    };
    users.push(user);

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      message: "Registration successful",
      user: { id: user.id, fullName: user.fullName, email: user.email },
      token,
    });
  } catch {
    res.status(500).json({ message: "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      message: "Login successful",
      user: { id: user.id, fullName: user.fullName, email: user.email },
      token,
    });
  } catch {
    res.status(500).json({ message: "Login failed" });
  }
});

router.post("/request-otp", (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    res.json({ message: "OTP sent to your email" });
  } catch {
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

export default router;
