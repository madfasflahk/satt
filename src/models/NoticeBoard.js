const mongoose=require("mongoose")

const NoticeSchema=new mongoose.Schema({
   
    title:String,
    notice:String,
    designation:String,
    name:String,
    number:Number,
    note:String,
    validation:{
        type:Boolean,
        default:false
    }

},{timestamps: true })

const Notice=mongoose.models.Notice || mongoose.model("Notice",NoticeSchema)
module.exports=Notice;