import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { srk } from "../names";
import { NavBar } from "../components/NavBar";

export const Participants = () => {
  const { hackathonId } = useParams(); 
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("hackathonId from URL:", hackathonId); // Debugging
    const fetchParticipants = async () => {
      if (!hackathonId) {
        setError("Invalid hackathon ID");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`${srk}/api/organizers/enrolled/${hackathonId}`);
        setParticipants(response.data.participants);
      } catch (err) {
        setError("Failed to fetch participants");
      } finally {
        setLoading(false);
      }
    };
    fetchParticipants();
  }, [hackathonId]);

  if (loading) return <p className="text-center text-gray-300">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-black text-gray-100" >
        <NavBar/>
    <div className="min-h-screen flex flex-col items-center bg-black text-gray-100 p-6">
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 mb-6">Participants List</h1>
      {participants.length > 0 ? (
        <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-6 border border-blue-500/30 hover:border-purple-500/40 transition-all duration-300">
          <table className="w-full border-collapse border border-blue-500/20">
            <thead>
              <tr className="bg-gray-900/20">
                <th className="border p-2 text-blue-300">Name</th>
                <th className="border p-2 text-blue-300">Email</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((participant) => (
                <tr key={participant._id} className="border-t border-blue-500/10">
                  <td className="border p-2 text-gray-600">{participant.name}</td>
                  <td className="border p-2 text-gray-600">{participant.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-300">No participants have enrolled yet.</p>
      )}
    </div>
    </div>
  );
};