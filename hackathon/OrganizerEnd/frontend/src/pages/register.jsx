import { useState } from "react";
import axios from "axios";
import { srk } from "../names";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(""); // State for email validation error
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" }); // State for success/failure messages
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent submission if email is invalid
    if (emailError || !email) {
      setStatusMessage({ type: "error", text: "Please provide a valid email address" });
      return;
    }

    // Additional basic validation for name and password
    if (!name) {
      setStatusMessage({ type: "error", text: "Full name is required" });
      return;
    }
    if (!password) {
      setStatusMessage({ type: "error", text: "Password is required" });
      return;
    }

    setLoading(true);
    setStatusMessage({ type: "", text: "" }); // Clear previous messages

    try {
      const response = await axios.post(`${srk}/api/organizers/signup`, {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        setStatusMessage({ type: "success", text: "Registration successful! Redirecting to login..." });
        setTimeout(() => navigate("/login"), 1500); // Delay for user to see success message
      }
    } catch (err) {
      setStatusMessage({ type: "error", text: "User already exists or invalid details." });
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1625314897518-18d4a9f24f9c?q=80&w=1920&auto=format&fit=crop")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 z-0 code-slide-animation"></div>
      <div className="w-full max-w-lg bg-gray-900/15 backdrop-blur-3xl rounded-3xl shadow-2xl p-8 border border-green-500/30 z-10 transform hover:scale-[1.03] transition-all duration-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 animate-gradient-shift"></div>
        <h2 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 mb-10 drop-shadow-xl animate-glow">
          Register
        </h2>
        {statusMessage.type === "error" && (
          <p className="text-red-300 text-center mb-6 bg-red-900/25 backdrop-blur-md py-3 rounded-xl border border-red-500/40 shadow-lg animate-fade-in">
            {statusMessage.text}
          </p>
        )}
        {statusMessage.type === "success" && (
          <p className="text-green-300 text-center mb-6 bg-green-900/25 backdrop-blur-md py-3 rounded-xl border border-green-500/40 shadow-lg animate-fade-in">
            {statusMessage.text}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div>
            <label className="block text-green-200 font-bold mb-2 tracking-widest text-shadow-lg">Full Name</label>
            <input
              type="text"
              className="w-full px-5 py-4 bg-gray-800/20 border border-green-500/40 rounded-xl text-gray-100 placeholder-gray-400/50 focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition-all duration-300 shadow-xl hover:shadow-green-500/30"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <label className="block text-green-200 font-bold mb-2 tracking-widest text-shadow-lg">Email</label>
            <input
              type="email"
              className={`w-full px-5 py-4 bg-gray-800/20 border rounded-xl text-gray-100 placeholder-gray-400/50 focus:ring-2 focus:border-transparent outline-none transition-all duration-300 shadow-xl ${
                emailError
                  ? "border-red-500/40 focus:ring-red-400 hover:shadow-red-500/30"
                  : "border-green-500/40 focus:ring-green-400 hover:shadow-green-500/30"
              }`}
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {emailError && (
              <p className="absolute left-0 mt-2 text-sm text-red-400">{emailError}</p>
            )}
          </div>
          <div>
            <label className="block text-green-200 font-bold mb-2 tracking-widest text-shadow-lg">Password</label>
            <input
              type="password"
              className="w-full px-5 py-4 bg-gray-800/20 border border-green-500/40 rounded-xl text-gray-100 placeholder-gray-400/50 focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition-all duration-300 shadow-xl hover:shadow-green-500/30"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-green-500 via-blue-600 to-purple-600 hover:from-green-600 hover:via-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-2xl hover:shadow-[0_0_20px_rgba(0,255,0,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-2"
            disabled={loading || emailError || !email || !name || !password} // Disable if invalid email or empty fields
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-gray-200 mt-7 text-sm drop-shadow-lg">
          Already have an account?{" "}
          <a href="/login" className="text-green-300 hover:text-green-200 font-bold transition-colors duration-200 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};