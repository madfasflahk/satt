const mongoose = require("mongoose")

const GameConfigSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true, // Ensure game keys are unique
    },
    name: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: true,
    },
});

const SattaKingResultOrderSchema = new mongoose.Schema({
    games: {
        type: [GameConfigSchema], // Array of GameConfigSchema
        default: [],
    },
}, { timestamps: true });

const SattaKingResultOrder = mongoose.models.SattaKingResultOrder || mongoose.model("SattaKingResultOrder", SattaKingResultOrderSchema)
module.exports = SattaKingResultOrder;