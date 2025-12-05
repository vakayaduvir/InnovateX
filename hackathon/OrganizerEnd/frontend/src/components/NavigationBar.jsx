import { Link } from "react-router-dom";
import IMAGE_URL from "../assets/bimg.png"; 

export const NavigationBar = () => {
  return (
    <div className="bg-black/90 backdrop-blur-2xl font-extrabold text-gray-100 text-lg p-5 border-b border-purple-500/40 shadow-lg">
      <div className="flex justify-between max-w-full mx-auto">
        <div className="flex gap-4 items-center">
          <img src={IMAGE_URL} alt="Logo" className="h-12 w-12"/>
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 animate-pulse">Hackathon</div>
        </div>
        
        <div className="flex gap-6 items-center">
          
          <Link to={"/register"} className="text-gray-100 hover:text-green-300 transition-colors duration-300 hover:bg-green-500/10 px-3 py-1 rounded-md">Register</Link>
          <Link to={"/login"} className="text-gray-100 hover:text-blue-300 transition-colors duration-300 hover:bg-blue-500/10 px-3 py-1 rounded-md">Login</Link>
        </div>
      </div>
    </div>
  );
};