const mongoose = require("mongoose");

const hackathonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    domain: { type: String, required: true },
    venue:{type: String, required: true},
    maximum:{type:Number,required:true},
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "Organizer" },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

module.exports = mongoose.model("Hackathon", hackathonSchema);
