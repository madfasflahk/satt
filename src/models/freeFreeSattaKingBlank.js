const mongoose=require("mongoose")

const freeAdSchema=new mongoose.Schema({
   
    title:String,
    content:String,
    aboutFees:String,
    name:String,
    number:Number,
    validation:{
        type:Boolean,
        default:false
    }
    
},{timestamps: true })
const FreeAd =
  mongoose.models.FreeAd || mongoose.model("FreeAd", freeAdSchema);

module.exports = FreeAd;