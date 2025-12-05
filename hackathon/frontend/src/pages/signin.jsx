import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { srk } from "../names";

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(""); // State for email validation error
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Validate email
    if (!value) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError(""); // Clear error if valid
    }
  };

  const onClick = async () => {
    // Prevent submission if email is invalid
    if (emailError || !email) {
      setStatusMessage({ type: "error", text: "Please provide a valid email address" });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${srk}/api/users/signin`, {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        setStatusMessage({ type: "success", text: "Login successful! Redirecting..." });
        setEmail("");
        setPassword("");
        setTimeout(() => navigate("/loginHome"), 1000);
      } else {
        setStatusMessage({ type: "error", text: "Login failed. Please check your credentials." });
      }
    } catch (error) {
      console.error("Login failed", error);
      setStatusMessage({
        type: "error",
        text: error.response?.data?.message || "Login failed. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Code Overlay with Blur */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-700/50 to-gray-900/70 backdrop-blur-md z-0 code-slide-animation"></div>
      <div className="w-full max-w-lg bg-gray-900/15 backdrop-blur-3xl rounded-3xl shadow-2xl p-8 border border-green-500/30 z-10 transform hover:scale-[1.03] transition-all duration-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 animate-gradient-shift"></div>
        <div className="relative z-10">
          <h2 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 mb-10 drop-shadow-xl animate-glow">
            Sign in
          </h2>
          <p className="text-gray-200 text-center mb-8 text-lg">Enter your credentials to access your account</p>
          <div className="space-y-8">
            <div className="relative">
              <label className="block text-green-200 font-bold mb-2 tracking-widest text-shadow-lg">Email</label>
              <input
                onChange={handleEmailChange}
                value={email}
                placeholder="Babu@gmail.com"
                className={`w-full px-5 py-4 bg-gray-800/20 border rounded-xl text-gray-100 placeholder-gray-400/50 focus:ring-2 focus:border-transparent outline-none transition-all duration-300 shadow-xl ${
                  emailError
                    ? "border-red-500/40 focus:ring-red-400 hover:shadow-red-500/30"
                    : "border-green-500/40 focus:ring-green-400 hover:shadow-green-500/30"
                }`}
              />
              {emailError && (
                <p className="absolute left-0 mt-2 text-sm text-red-400">{emailError}</p>
              )}
            </div>
            <div>
              <label className="block text-green-200 font-bold mb-2 tracking-widest text-shadow-lg">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
                placeholder="Password"
                className="w-full px-5 py-4 bg-gray-800/20 border border-green-500/40 rounded-xl text-gray-100 placeholder-gray-400/50 focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition-all duration-300 shadow-xl hover:shadow-green-500/30"
              />
            </div>
            <button
              onClick={onClick}
              className="w-full py-4 bg-gradient-to-r from-green-500 via-blue-600 to-purple-600 hover:from-green-600 hover:via-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-2xl hover:shadow-[0_0_20px_rgba(0,255,0,0.5)] transition-all duration-300 transform hover:-translate-y-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || emailError || !email || !password} // Disable if invalid email or empty fields
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          {statusMessage.type === "error" && (
            <p className="text-red-300 text-center mt-6 bg-red-900/25 backdrop-blur-md py-3 rounded-xl border border-red-500/40 shadow-lg animate-fade-in">
              {statusMessage.text}
            </p>
          )}
          {statusMessage.type === "success" && (
            <p className="text-green-300 text-center mt-6 bg-green-900/25 backdrop-blur-md py-3 rounded-xl border border-green-500/40 shadow-lg animate-fade-in">
              {statusMessage.text}
            </p>
          )}

          <p className="text-center text-gray-200 mt-7 text-sm drop-shadow-lg">
            Don't have an account?{" "}
            <a href="/" className="text-green-300 hover:text-green-200 font-bold transition-colors duration-200 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};