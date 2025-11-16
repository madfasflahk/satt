const mongoose = require("mongoose")

const SattaKingAlterNativeSchema = new mongoose.Schema({

    alternative:String,
    

}, { timestamps: true })

const SattaKingAlterNative = mongoose.models.SattaKingAlterNative || mongoose.model("SattaKingAlterNative", SattaKingAlterNativeSchema)
module.exports = SattaKingAlterNative;