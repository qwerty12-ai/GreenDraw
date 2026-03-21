import mongoose from "mongoose";

const drawSchema = new mongoose.Schema({
    numbers: {type: [Number], required: true, validate:[{validator: arr => arr.length === 5, message: "Must have 5 numbers"},{ validator: arr => arr.every(n => n >= 1 && n <= 45),message: "Numbers must be between 1 and 45"}]},

    results: [
        {
            userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
            matchCount: {type:Number,required: true},
            prize: {type:Number,required: true}
        }
    ],
    default: []
},{timestamps: true})

export default mongoose.models.Draw || mongoose.model("Draw", drawSchema)