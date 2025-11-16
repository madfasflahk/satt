const mongoose = require("mongoose")

const factSchema = new mongoose.Schema({

   title: String,
   
   about: String,
   fees:String,
   name: String,
   number: Number,
   validation: {
      type: Boolean,
      default: false
   }

}, { timestamps: true })

const Fact = mongoose.models.Fact || mongoose.model("fact", factSchema)
module.exports = Fact;