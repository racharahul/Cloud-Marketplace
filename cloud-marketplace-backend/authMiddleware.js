import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Get the token from the request header
  const token = req.header("Authorization");

  console.log("🔍 Received Token:", token); // Debug log

  // Check if token is provided
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Ensure token starts with "Bearer "
    if (!token.startsWith("Bearer ")) {
      console.log("🚨 Token format incorrect!");
      return res.status(401).json({ message: "Invalid token format" });
    }

    // Extract actual token (remove "Bearer ")
    const actualToken = token.split(" ")[1];
    console.log("📜 Extracted Token:", actualToken); // Debug log

    // Verify the token
    const decoded = jwt.verify(actualToken, "your_jwt_secret"); // Ensure this matches in login route

    console.log("✅ Token Verified. Decoded Data:", decoded); // Debug log

    // Attach the user data to the request object
    req.user = decoded;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    console.error("❌ Token Verification Error:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
