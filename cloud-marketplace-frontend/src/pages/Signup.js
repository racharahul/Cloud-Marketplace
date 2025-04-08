import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../validation/authValidation";
import { signupUser } from "../api/authApi";
import { useNavigate, useLocation } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get("role") || "buyer"; // Default to 'buyer'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { role },
  });

  const onSubmit = async (data) => {
    try {
      await signupUser({ ...data, role }); // Include role in request
      alert("Signup successful!");
      navigate(`/login?role=${role}`); // 🔥 Pass role when navigating to login
    } catch (error) {
      alert(error.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-sm w-full bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        {/* 🔹 Display Role */}
        <h2 className="text-center text-2xl font-bold text-blue-600">
          {role === "buyer" ? "Buyer Signup" : "Seller Signup"}
        </h2>

        <div>
          <input
            type="text"
            {...register("name")}
            className="w-full p-2 border rounded-md"
            placeholder="Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            {...register("email")}
            className="w-full p-2 border rounded-md"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            {...register("password")}
            className="w-full p-2 border rounded-md"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Hidden input field to send role in form submission */}
        <input type="hidden" {...register("role")} value={role} />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
