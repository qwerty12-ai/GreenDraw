
// TODO: Integrate Pool Model for dynamic calculation.

import mongoose from "mongoose";

const poolSchema = new mongoose.Schema({
    totalAmount: {type: Number, default: 0},

    distribution: {
        fiveMatch: {type: Number, default: 40},
        fourMatch: {type: Number, default: 35},
        threeMatch: {type: Number, default: 25}
    }
})

export default mongoose.models.Pool ||  mongoose.model("Pool", poolSchema);