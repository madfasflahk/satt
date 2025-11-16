const mongoose = require("mongoose")

const ImportantFactAboutSattaSchema = new mongoose.Schema({
   importantFactSatta: String,
}, { timestamps: true })

const ImportantFactAboutSatta = mongoose.models.ImportantFactAboutSatta || mongoose.model("ImportantFactAboutSatta", ImportantFactAboutSattaSchema)
module.exports = ImportantFactAboutSatta;