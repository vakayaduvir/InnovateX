import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { srk } from "../names";
import IMAGE_URL from "../assets/bimg.png"; // Note: Still unused in the code

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(""); // State for email validation error
  const [password, setPassword] = useState("");
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

  const handleSignUp = async () => {
    // Prevent submission if email is invalid
    if (emailError || !email) {
      setStatusMessage({ type: "error", text: "Please provide a valid email address" });
      return;
    }

    // Additional basic validation for name and password
    if (!name) {
      setStatusMessage({ type: "error", text: "Name is required" });
      return;
    }
    if (!password) {
      setStatusMessage({ type: "error", text: "Password is required" });
      return;
    }

    try {
      const response = await axios.post(`${srk}/api/users/signup`, {
        name,
        email,
        password,
      });

      if (response) {
        setStatusMessage({ type: "success", text: "Signup Successful! Redirecting..." });
        setName("");
        setEmail("");
        setPassword("");
        setTimeout(() => navigate("/signin"), 500);
      } else {
        setStatusMessage({ type: "error", text: "Signup failed. Please try again." });
      }
    } catch (error) {
      console.error("Sign up failed", error);
      setStatusMessage({
        type: "error",
        text: error.response?.data?.message || "Signup failed. Try again later.",
      });
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
            Sign up
          </h2>
          <p className="text-gray-200 text-center mb-8 text-lg">Enter your information to create an account</p>
          <div className="space-y-8">
            <div>
              <label className="block text-green-200 font-bold mb-2 tracking-widest text-shadow-lg">First Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="First Name"
                className="w-full px-5 py-4 bg-gray-800/20 border border-green-500/40 rounded-xl text-gray-100 placeholder-gray-400/50 focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition-all duration-300 shadow-xl hover:shadow-green-500/30"
              />
            </div>
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
              onClick={handleSignUp}
              className="w-full py-4 bg-gradient-to-r from-green-500 via-blue-600 to-purple-600 hover:from-green-600 hover:via-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-2xl hover:shadow-[0_0_20px_rgba(0,255,0,0.5)] transition-all duration-300 transform hover:-translate-y-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={emailError || !email || !name || !password} // Disable if invalid email or empty fields
            >
              Sign up
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
            Already have an account?{" "}
            <a href="/signin" className="text-green-300 hover:text-green-200 font-bold transition-colors duration-200 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};