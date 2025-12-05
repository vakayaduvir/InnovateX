import { Button } from "./Button"; 

export const Card = ({ title, description, date, domain, venue, onRegister }) => {
  return (
    <div className="bg-white border-2 shadow-xl rounded-lg p-6 max-w-md w-full justify-between transition-all hover:scale-105 hover:shadow-2xl">
      <h2 className="text-xl font-bold text-gray-900 flex justify-center mb-4">{title}</h2>
      
      <p className="text-gray-700 mt-3 font-semibold">Domain: {domain}</p>
      <p className="text-gray-600 mt-3 font-medium text-sm leading-relaxed whitespace-pre-wrap line-clamp-4 overflow-hidden">
        {description}
      </p>

      <div className="flex justify-between text-gray-700 font-medium mt-3">
        <p>Last Date: {date}</p>
        <p>Venue: {venue}</p>
      </div>

      <button 
        className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white py-2 px-4 mt-4 rounded hover:from-green-600 hover:via-blue-600 hover:to-purple-600 transition duration-200 cursor-pointer w-full"
        onClick={onRegister}
      >
        Register
      </button>
    </div>
  );
};