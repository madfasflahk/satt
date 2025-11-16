const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({

  name:String,
  email:String,
  password:String,
  role:Number

}, { timestamps: true })

const User = mongoose.models.User || mongoose.model("User", UserSchema)
module.exports = User;