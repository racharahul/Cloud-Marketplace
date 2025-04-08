import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../api/authApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const role = searchParams.get("role");

  // 🔥 If no valid role, redirect to signup
  useEffect(() => {
    if (!role || (role !== "seller" && role !== "buyer")) {
      navigate("/signup"); // Redirect to signup if role is invalid
    }
  }, [role, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password, role }); // ✅ include role from URL
      alert(`Login successful as ${role.toUpperCase()}!`);

      localStorage.setItem("token", response.token);
      localStorage.setItem("role", role); // 🔥 Store correct role

      if (role === "seller") {
        navigate("/seller/dashboard");
      } else if (role === "buyer") {
        navigate("/buyer/home");
      } else {
        navigate("/profile");
      }
    } catch (error) {
      alert(error.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        {/* 🔥 Only show "SELLER" or "BUYER" (No "USER" fallback) */}
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Login as {role.toUpperCase()}
        </h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-md mb-3"
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
