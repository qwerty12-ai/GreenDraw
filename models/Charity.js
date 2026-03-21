import mongoose from "mongoose";

const charitySchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: String,
    image: {type: String, default: ""}
}, {timestamps: true})

export default mongoose.models.Charity || mongoose.model("Charity", charitySchema);