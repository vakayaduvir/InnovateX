import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../components/Card"; 
import { srk } from "../names";
import { NavBar } from "../components/NavBar";


export const PostHack = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${srk}/api/organizers/bulk`, {
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


  return (
    <div className="min-h-screen bg-black text-gray-100">
        <NavBar/>
    <div className="min-h-screen bg-black flex flex-col p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-700/50 to-gray-900/70 backdrop-blur-md z-0 code-slide-animation"></div>
      <div className="relative z-10">

        <div className="p-8">
          <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 mb-10 drop-shadow-xl animate-glow">
            Organizer
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {events.map((event) => (
              <Card 
                eventId={event._id}  
                title={event.title} 
                
                domain={event.domain}
                
                venue={event.venue}
                date={event.date}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};