import { Link, useNavigate } from "react-router-dom";
import IMAGE_URL from "../assets/icon.png"; 

export const NavBar = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-gray-900/15 backdrop-blur-3xl font-extrabold text-gray-200 text-xl p-5 border-b border-green-500/30">
            <div className="flex justify-between max-w-full mx-auto">
                <div className="flex gap-4 items-center">
                    <img src={IMAGE_URL} alt="Logo" className="h-12 w-12"/>
                    <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 animate-glow">Hackathon</div>
                </div>
                
                <div className="flex gap-6 items-center">
                    <div>
                        <Link to={"/loginHome"}className="text-gray-200 hover:text-green-300 transition-colors duration-300">Home</Link>
                    </div>
                    <div>
                        <Link to={"/registeredEvent"} className="text-gray-200 hover:text-green-300 transition-colors duration-300"> Registered Events</Link>
                    </div>
                    <div>
                        <button 
                            onClick={() => {
                                localStorage.removeItem("token");
                                navigate("/");
                            }} 
                            className="text-gray-200 hover:text-green-300 transition-colors duration-300 bg-gradient-to-r from-green-500/20 to-purple-500/20 px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-green-500/30 hover:to-purple-500/30"
                        >
                            LogOut
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};