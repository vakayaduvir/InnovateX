import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../components/Card"; 
import { srk } from "../names";
import { NavBar } from "../components/NavBar";

export const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [enrollYes, setEnrollYes] = useState(false);
  const [enrollNo, setEnrollNo] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${srk}/api/users/bulk`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }); 
        setEvents(response.data); 
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const onEnroll = async (eventId) => {
    try {
      const response = await axios.post(
        `${srk}/api/users/enroll`,
        { key: eventId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setEnrollYes(true);
        setEnrollNo(false);
        setTimeout(() => setEnrollYes(false), 2000);
      } 
    } catch (error) {
      console.error("Error enrolling:", error);
      setEnrollNo(true);
      setEnrollYes(false);
      setErrorMessage(error.response?.data?.message || "Enrollment failed!");
      setTimeout(() => setEnrollNo(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-700/50 to-gray-900/70 backdrop-blur-md z-0 code-slide-animation"></div>
      <div className="relative z-10">
        <NavBar />
        <div className="p-8">
          <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 mb-10 drop-shadow-xl animate-glow">
            Welcome Participant
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {events.map((event) => (
              <Card 
                key={event._id} 
                title={event.title} 
                description={event.description} 
                domain={event.domain}
                maximum={event.maximum}
                venue={event.venue}
                date={event.date}
                onRegister={() => onEnroll(event._id)}
              />
            ))}
          </div>
        </div>

        {enrollYes && (
          <p className="text-green-900 text-center font-extrabold bg-white-900/25  py-3 px-6 rounded-xl border border-green-500/10 shadow-lg animate-fade-in fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            Enrollment Successful!
          </p>
        )}
        {enrollNo && (
          <p className="text-red-900 text-center font-extrabold bg-yellow-900/25 py-3 px-6 rounded-xl border border-red-500/10 shadow-lg animate-fade-in fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};