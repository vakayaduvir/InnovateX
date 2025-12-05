const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const useAuthware = require("../middleware/useAuthware"); 
const Hackathon = require("../models/Hackathon");
require("dotenv").config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "User login successful", token });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/bulk", useAuthware, async (req, res) => {
    try {
        const bulk = await Hackathon.find({}); 
        res.status(200).json(bulk);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.post("/enroll", useAuthware, async (req, res) => {
    try {
        const hackathonId = req.body.key;  
        const userId = req.userId;

       
        const userExists = await Hackathon.findOne({
            _id: hackathonId,
            participants: userId
        });
        const enrolled=await User.findOne({
            _id:userId,
            enrolledHackathons:hackathonId
        })

        if (userExists&&enrolled) {
            return res.status(400).json({ message: "User already enrolled in this hackathon!" });
        }

       
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        
        user.enrolledHackathons.push(hackathonId);
        await user.save();

        
        const hackathon = await Hackathon.findById(hackathonId);
        if (!hackathon) {
            return res.status(404).json({ message: "Hackathon not found" });
        }

       
        hackathon.participants.push(userId);
        await hackathon.save();

        res.status(200).json({ message: "Successfully enrolled in the hackathon!" });

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

router.get("/submit", useAuthware, async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({ message: "User ID not found" });
        }

        const user = await User.findById(userId).populate("enrolledHackathons");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ enrolledHackathon: user.enrolledHackathons });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});





module.exports = router;
