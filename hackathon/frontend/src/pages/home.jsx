import { NavigationBar } from "../components/NavigationBar";
import { Link } from "react-router-dom";

export const Home = () => {
  // Static data for upcoming events (replace with API call if needed)
  const upcomingEvents = [
    { id: 1, title: "CodeStorm 2025", date: "March 15-16, 2025", location: "Virtual" },
    { id: 2, title: "HackTheFuture", date: "April 22-23, 2025", location: "San Francisco, CA" },
    { id: 3, title: "AI Innovate Hack", date: "May 10-11, 2025", location: "London, UK" },
  ];

  // Using an online image from Unsplash (hackathon-themed)
  const HACKATHON_IMAGE_URL = "https://images.unsplash.com/photo-1517048676732-d65bc9373597?q=80&w=1920&auto=format&fit=crop";

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Navigation */}
      <NavigationBar />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90 backdrop-blur-sm z-0"></div>
        <img
          src={HACKATHON_IMAGE_URL}
          alt="Hackathon Event"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          onError={(e) => { e.target.style.display = 'none'; }} // Fallback if image fails to load
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 animate-pulse mb-6">
            Unleash Your Code
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-8">
            Join the ultimate coding experience. Compete, innovate, and connect with tech enthusiasts worldwide.
          </p>
          <Link
            to="/signup"
            className="inline-block px-8 py-4 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white font-bold rounded-xl hover:from-green-600 hover:via-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(0,255,0,0.5)]"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 px-4 md:px-8">
        <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 mb-12">
          Upcoming Events
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-gray-900/20 backdrop-blur-xl rounded-xl p-6 border border-green-500/30 hover:border-purple-500/40 transition-all duration-300 hover:shadow-[0_0_15px_rgba(147,51,234,0.3)]"
            >
              <h3 className="text-xl font-semibold text-green-300 mb-2">{event.title}</h3>
              <p className="text-gray-300 mb-1">Date: {event.date}</p>
              <p className="text-gray-300">Location: {event.location}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/signup"
            className="text-blue-300 hover:text-blue-200 underline transition-colors duration-300"
          >
            Register to participate
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-black to-gray-900/50">
        <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 mb-12">
          Why Join Us?
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="text-3xl text-green-400 mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-gray-100 mb-2">Innovate</h3>
            <p className="text-gray-300">Build cutting-edge solutions with the latest tech.</p>
          </div>
          <div className="text-center p-6">
            <div className="text-3xl text-blue-400 mb-4">🤝</div>
            <h3 className="text-xl font-semibold text-gray-100 mb-2">Connect</h3>
            <p className="text-gray-300">Network with developers and industry leaders.</p>
          </div>
          <div className="text-center p-6">
            <div className="text-3xl text-purple-400 mb-4">🏆</div>
            <h3 className="text-xl font-semibold text-gray-100 mb-2">Compete</h3>
            <p className="text-gray-300">Showcase your skills and win exciting prizes.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-gray-400 border-t border-gray-800">
        <p>&copy; 2025 Hackathon Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};