import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
    value: {type: Number, min: 1, max: 45, required: true},
    date: {type: Date, default: Date.now}
});

const winnerSchema = new mongoose.Schema({
    drawId: {type: mongoose.Schema.Types.ObjectId, ref: "Draw"},
    matchCount: Number,
    amount: Number,
    status: {type: String, enum: ["pending", "paid"], default: "pending"},
    proof: String,
    charityDonated: Number
})

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},

    subscription: {
        plan: {type: String, enum: ["monthly", "yearly"]},
        status: {type: String, enum: ["active", "inactive"], default: "active"},
        renewalDate: Date
    },

    scores:  {
        type: [scoreSchema],
        default: [],
        validate: [arr => arr.length <= 5, "Max 5 scores allowed"] 
    },

    charity: {
        charityId: {type: mongoose.Schema.Types.ObjectId, ref: "Charity"},
        percentage: {type: Number, min: 10, default: 10},
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

    winnings: {type: [winnerSchema], default: []}
}, {timestamps: true});

export default mongoose.models.User ||  mongoose.model("User", userSchema);