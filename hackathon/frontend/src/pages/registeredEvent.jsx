import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { srk } from "../names";
import axios from "axios";
import { Button } from "../components/Button";

export const RegisteredEvent = () => {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [projectLink, setProjectLink] = useState("");
  const [selectedHackathon, setSelectedHackathon] = useState(null);

  useEffect(() => {
    const fetchEnrolledHackathons = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${srk}/api/users/submit`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHackathons(response.data.enrolledHackathon || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEnrolledHackathons();
  }, []);

  const handleUploadClick = (hackathon) => {
    setSelectedHackathon(hackathon);
    setShowModal(true);
  };

  const handleSubmitProject = async () => {
    if (!projectLink.trim()) {
      alert("Please enter a valid project link.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${srk}/api/users/upload`, {
        hackathonId: selectedHackathon._id,
        projectLink,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Project link submitted successfully!");
      setShowModal(false);
      setProjectLink("");
    } catch (error) {
      console.error("Error submitting project:", error);
      alert("Failed to submit project.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <NavBar />
      <div className="p-6 min-h-screen bg-black text-gray-100">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 mb-6">
          Registered Hackathons
        </h1>
        {loading && <p className="text-gray-300">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && hackathons.length === 0 && (
          <p className="text-gray-300">No hackathons registered.</p>
        )}
        <div className="mt-4 space-y-4">
          {hackathons.map((hackathon) => (
            <div
              key={hackathon._id}
              className="bg-gray-900/20 backdrop-blur-xl rounded-xl p-6 border border-green-500/30 hover:border-purple-500/40 transition-all duration-300 hover:shadow-[0_0_15px_rgba(147,51,234,0.3)]"
            >
              <h2 className="text-xl font-semibold text-green-300 mb-2">{hackathon.title}</h2>
              <p className="text-gray-300">
                <strong>Domain:</strong> {hackathon.domain}
              </p>
              <p className="text-gray-300">
                <strong>Date:</strong> {hackathon.date}
              </p>
              <p className="text-gray-300">
                <strong>Venue:</strong> {hackathon.venue}
              </p>
              <Button onClick={() => handleUploadClick(hackathon)} label="Upload Project" />
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 border border-blue-500/30">
            <h2 className="text-xl font-semibold text-blue-300 mb-4">Upload Project Link</h2>
            <input
              type="text"
              className="w-full p-2 border rounded border-blue-500/30 bg-gray-900/20 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
              placeholder="Enter project link..."
              value={projectLink}
              onChange={(e) => setProjectLink(e.target.value)}
            />
            <div className="mt-4 flex justify-end">
              <Button onClick={handleSubmitProject} label="Submit" />
              <Button onClick={() => setShowModal(false)} label="Cancel" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
