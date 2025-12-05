const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
    try {
        const token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({ message: "Access Denied: No token provided" });
        }

        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        
        if (!decoded.organizerId) {
            return res.status(403).json({ message: "Invalid token: Not an organizer" });
        }

        req.organizerId = decoded.organizerId; 
        next(); 
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;
