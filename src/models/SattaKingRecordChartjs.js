const mongoose = require("mongoose")

const SattaKingRecordChartjsSchema = new mongoose.Schema({
    
    year: String,
    month: Number,
    resultList: [
        {
            day: Number,
            DateTime: Number,
            delhiLuckyBazar: String,
            disawer: String,
            faridabad: String,
            gaziyabad: String,
            kolkataKing: String,
            gali: String,
            delhiBazar: String,
            shreeGanesh: String,
            luckpoti: String,
            sreeRam: String,
            dlb: String
        }
    ]










}, { timestamps: true })

const SattaKingRecordChartjs = mongoose.models.SattaKingRecordChartjs || mongoose.model("SattaKingRecordChartjs", SattaKingRecordChartjsSchema)
module.exports = SattaKingRecordChartjs;