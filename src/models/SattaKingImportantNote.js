const mongoose = require("mongoose")

const SattaKingImportantNoteSchema = new mongoose.Schema({
    title:String,
    SattaKingImportantNote: String,
    validation:{
        type:Boolean,
        default:false
    }

}, { timestamps: true })

const SattaKingImportantNote = mongoose.models.SattaKingImportantNote || mongoose.model("SattaKingImportantNote", SattaKingImportantNoteSchema)
module.exports = SattaKingImportantNote;