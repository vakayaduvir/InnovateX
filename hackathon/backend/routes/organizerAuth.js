const express = require("express");
const Organizer = require("../models/Organizer");
const Hackathon = require("../models/Hackathon");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
require("dotenv").config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;


router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingOrganizer = await Organizer.findOne({ email });
        if (existingOrganizer) {
            return res.status(400).json({ message: "Organizer already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newOrganizer = new Organizer({ name, email, password: hashedPassword });
        await newOrganizer.save();

        res.status(201).json({ message: "Organizer registered successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});




router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const organizer = await Organizer.findOne({ email });

        if (!organizer) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, organizer.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { organizerId: organizer._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});



router.post("/hackathon", authMiddleware, async (req, res) => {
    try {
        const { title, description, date,domain,venue,maximum } = req.body;

        const organizer = await Organizer.findById(req.organizerId);
        if (!organizer) {
            return res.status(404).json({ message: "Organizer not found" });
        }

        const hackathon = new Hackathon({ title, description, date,domain,venue,maximum, organizer: req.organizerId });
        await hackathon.save();

        organizer.hackathonsPosted.push(hackathon._id);
        await organizer.save();

        res.status(201).json({ message: "Hackathon posted successfully!", hackathon });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.get("/bulk", async (req, res) => {
    try {
        const bulk = await Hackathon.find({}); 
        res.status(200).json(bulk);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/enrolled/:hackathonId", async (req, res) => {
    try {
        const { hackathonId } = req.params;
        const hackathon = await Hackathon.findById(hackathonId).populate("participants", "name email"); 
        

        if (!hackathon) {
            return res.status(404).json({ message: "Hackathon not found" });
        }

        res.status(200).json({ participants: hackathon.participants });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



module.exports = router;
