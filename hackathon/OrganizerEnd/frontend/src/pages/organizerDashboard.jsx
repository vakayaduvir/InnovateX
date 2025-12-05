import React, { useState } from "react";
import axios from "axios";
import { srk } from "../names";
import { NavBar } from "../components/NavBar";

export const OrganizerDashboard = ({ onAddHackathon }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    lastDate: "",
    domain: "",
    location: "",
    maxParticipants: "",
  });

  const domainsOptions = ["AI/ML", "Web Development", "Blockchain", "IoT", "Cybersecurity"];

  // Static achievement data (replace with API data if available)
  const achievements = {
    hackathonsOrganized: 12,
    totalParticipants: 2450,
    awardsWon: 5,
  };

  const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1920&auto=format&fit=crop";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      title: formData.title,
      description: formData.description,
      date: formData.lastDate,
      domain: formData.domain,
      venue: formData.location,
      maximum: Number(formData.maxParticipants),
    };

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found in localStorage");
      alert("Please log in first to create a hackathon.");
      return;
    }

    try {
      const response = await axios.post(
        `${srk}/api/organizers/hackathon`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const newHackathon = {
        id: response.data.id || Date.now(),
        name: formData.title,
        date: formData.lastDate,
        description: formData.description,
        domains: [formData.domain],
        location: formData.location,
        maxParticipants: formData.maxParticipants,
        participants: [],
      };

      if (typeof onAddHackathon === "function") {
        onAddHackathon(newHackathon);
      } else {
        console.warn("onAddHackathon is not a function, skipping execution");
      }

      setFormData({
        title: "",
        description: "",
        lastDate: "",
        domain: "",
        location: "",
        maxParticipants: "",
      });
      setIsModalOpen(false);

      console.log("Hackathon created successfully:", response.data);
    } catch (error) {
      const errorDetails = {
        message: error.message,
        status: error.response ? error.response.status : "No status",
        data: error.response ? error.response.data : "No data",
      };
      console.error("Error creating hackathon:", errorDetails);
      const errorMessage = error.response?.data?.message || error.message || "Unknown error";
      alert(`Failed to create hackathon: ${errorMessage}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <NavBar />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90 backdrop-blur-sm z-0"></div>
        <img
          src={HERO_IMAGE_URL}
          alt="Organizer Dashboard Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 animate-pulse mb-6">
            Shape the Future
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-8">
            Lead cutting-edge hackathons and inspire innovation worldwide.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-6">
        {/* Hackathons Organized */}
        <section className="mb-16">
          <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-10 tracking-wider">
            Your Impact
          </h2>
          <div className="flex justify-center">
            <div className="relative bg-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/50 hover:border-purple-500/60 transition-all duration-300 hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] w-full max-w-md">
              <div className="text-center">
                <div className="text-5xl font-bold text-cyan-300 mb-2">{achievements.hackathonsOrganized}</div>
                <p className="text-lg text-gray-200">Hackathons Organized</p>
              </div>
            </div>
          </div>
        </section>

        {/* Add New Hackathon Button */}
        {!isModalOpen && (
          <div className="flex justify-center mb-12">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-10 py-4 rounded-xl shadow-xl text-xl font-semibold transition-transform duration-300 hover:scale-105"
            >
              Add New Hackathon
            </button>
          </div>
        )}

        {/* Achievements Below Button */}
        {!isModalOpen && (
          <section className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="relative bg-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/50 hover:border-purple-500/60 transition-all duration-300 hover:shadow-[0_0_20px_rgba(147,51,234,0.4)]">
                <div className="text-center">
                  <div className="text-5xl font-bold text-cyan-300 mb-2">{achievements.totalParticipants.toLocaleString()}</div>
                  <p className="text-lg text-gray-200">Total Participants</p>
                </div>
              </div>
              <div className="relative bg-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/50 hover:border-purple-500/60 transition-all duration-300 hover:shadow-[0_0_20px_rgba(147,51,234,0.4)]">
                <div className="text-center">
                  <div className="text-5xl font-bold text-cyan-300 mb-2">{achievements.awardsWon}</div>
                  <p className="text-lg text-gray-200">Awards Won</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Modal for Creating Hackathon */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4">
            <div className="bg-gray-900/60 backdrop-blur-2xl p-6 rounded-3xl shadow-2xl w-full max-w-lg border border-cyan-500/50">
              <h2 className="text-3xl font-extrabold text-cyan-200 text-center mb-6 tracking-widest">
                Create Hackathon
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-medium text-cyan-300 mb-2">Hackathon Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800/60 text-cyan-100 border border-cyan-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-cyan-400/70 text-sm"
                    placeholder="Enter title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-cyan-300 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full max-w-lg p-3 bg-gray-800/60 text-cyan-100 border border-cyan-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-cyan-400/70 text-sm resize-y"
                    rows="3"
                    placeholder="Describe it"
                    wrap="soft"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-cyan-300 mb-2">Last Date</label>
                  <input
                    type="date"
                    name="lastDate"
                    value={formData.lastDate}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800/60 text-cyan-100 border border-cyan-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-cyan-300 mb-2">Domain</label>
                  <select
                    name="domain"
                    value={formData.domain}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800/60 text-cyan-100 border border-cyan-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
                    required
                  >
                    <option value="">Select a domain</option>
                    {domainsOptions.map((domain) => (
                      <option key={domain} value={domain}>
                        {domain}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-cyan-300 mb-2">Venue</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800/60 text-cyan-100 border border-cyan-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-cyan-400/70 text-sm"
                    placeholder="e.g., Online"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-cyan-300 mb-2">Max Participants</label>
                  <input
                    type="number"
                    name="maxParticipants"
                    value={formData.maxParticipants}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800/60 text-cyan-100 border border-cyan-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-cyan-400/70 text-sm"
                    min="1"
                    placeholder="Max number"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-cyan-300 px-6 py-2 rounded-xl font-medium transition-transform duration-300 hover:scale-105 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-6 py-2 rounded-xl font-medium shadow-lg transition-transform duration-300 hover:scale-105 text-sm"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};