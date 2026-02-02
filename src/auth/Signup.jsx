import { supabase } from "@/supabase/Supabase";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  const [fullName, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password does not match");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Signup successful! Check your email.", {
        autoClose: 2000,
      });
      console.log(data);
      navigate("/login");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Create Your Account
        </h2>

        <form className="space-y-5" onSubmit={signup}>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Full Name
            </label>
            <input
              onChange={(e) => setFullname(e.target.value)}
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Confirm Password
            </label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 text-sm">
            <input type="checkbox" className="mt-1 rounded" />
            <p className="text-white">
              I agree to the{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms & Conditions
              </a>
            </p>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-200 mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
