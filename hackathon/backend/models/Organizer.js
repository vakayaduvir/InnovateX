const mongoose = require("mongoose");

const organizerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type:String, required: true },
    hackathonsPosted: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hackathon" }],
}, { timestamps: true });

module.exports = mongoose.model("Organizer", organizerSchema);
