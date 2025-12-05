const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    enrolledHackathons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hackathon" }],
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
