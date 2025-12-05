import { NavigationBar } from "../components/NavigationBar";
import { Link } from "react-router-dom";

export const Home = () => {
  // Static data for organizer events (replace with API call if needed)
  const managedEvents = [
    { id: 1, title: "CodeStorm 2025", date: "March 15-16, 2025", location: "Virtual", participants: 245 },
    { id: 2, title: "HackTheFuture", date: "April 22-23, 2025", location: "San Francisco, CA", participants: 180 },
    { id: 3, title: "AI Innovate Hack", date: "May 10-11, 2025", location: "London, UK", participants: 320 },
  ];

  // Using an online image from Unsplash (organizer-themed)
  const ORGANIZER_IMAGE_URL = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1920&auto=format&fit=crop";

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Navigation */}
      <NavigationBar />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90 backdrop-blur-sm z-0"></div>
        <img
          src={ORGANIZER_IMAGE_URL}
          alt="Organizer Dashboard"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          onError={(e) => { e.target.style.display = 'none'; }} 
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 animate-pulse mb-6">
            Organizers
            Empower Innovation
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-8">
            Create, manage, and grow hackathon events that inspire the next generation of tech leaders.
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-4 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white font-bold rounded-xl hover:from-green-600 hover:via-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(0,255,0,0.5)]"
          >
            Create New Event
          </Link>
        </div>
      </section>

      {/* Managed Events Section */}
      <section className="py-16 px-4 md:px-8">
        <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 mb-12">
          Your Managed Events
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {managedEvents.map((event) => (
            <div
              key={event.id}
              className="bg-gray-900/20 backdrop-blur-xl rounded-xl p-6 border border-green-500/30 hover:border-purple-500/40 transition-all duration-300 hover:shadow-[0_0_15px_rgba(147,51,234,0.3)]"
            >
              <h3 className="text-xl font-semibold text-green-300 mb-2">{event.title}</h3>
              <p className="text-gray-300 mb-1">Date: {event.date}</p>
              <p className="text-gray-300 mb-1">Location: {event.location}</p>
              <p className="text-gray-300">Participants: {event.participants}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/manage-events"
            className="text-blue-300 hover:text-blue-200 underline transition-colors duration-300"
          >
            Manage all events
          </Link>
        </div>
      </section>

      {/* Organizer Tools Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-black to-gray-900/50">
        <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 mb-12">
          Organizer Benefits
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="text-3xl text-green-400 mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-100 mb-2">Plan</h3>
            <p className="text-gray-300">Easily schedule and customize your events.</p>
          </div>
          <div className="text-center p-6">
            <div className="text-3xl text-blue-400 mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-100 mb-2">Track</h3>
            <p className="text-gray-300">Monitor registrations and event progress.</p>
          </div>
          <div className="text-center p-6">
            <div className="text-3xl text-purple-400 mb-4">🌐</div>
            <h3 className="text-xl font-semibold text-gray-100 mb-2">Engage</h3>
            <p className="text-gray-300">Connect with participants and sponsors.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-gray-400 border-t border-gray-800">
        <p>© 2025 Hackathon Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};