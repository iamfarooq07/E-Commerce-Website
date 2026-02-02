import { supabase } from "@/supabase/Supabase";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Login SuccessFully", {
        autoClose: 2000,
      });
      // console.log(data.user.id);
      if (data.user.id) {
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-8">
        <h2 className="text-4xl font-bold text-center text-white mb-6">
          Login
        </h2>

        <form className="space-y-5" onSubmit={login}>
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
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              Remember me
            </label>
            <a href="#" className="text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-200 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/sign"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
