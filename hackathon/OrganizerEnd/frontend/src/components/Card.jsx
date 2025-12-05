import { Link } from "react-router-dom";

export const Card = ({ eventId, title, date, domain, venue }) => {
  return (
    <div className="p-4">
      <Link to={`/participants/${eventId}`}>
        <div className="bg-white border-2 shadow-xl rounded-lg p-6 max-w-md w-full justify-between transition-all hover:scale-105 hover:shadow-2xl">
          <h2 className="text-xl font-bold text-gray-900 flex justify-center mb-4">{title}</h2>
          <p className="text-gray-700 mt-3 font-semibold">Domain: {domain}</p>
          <div className="flex justify-between text-gray-700 font-medium mt-3">
            <p>Last Date: {date}</p>
            <p>Venue: {venue}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
