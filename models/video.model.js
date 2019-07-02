const mongoose = require("mongoose")

const Schema = mongoose.Schema

const videoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    thumbnailUrl: {
        required: true,
        type: String
    },
    videoUrl: {
        required: true,
        type: String
    },
    duration: {
        type: Number,
        required: true
    }
})

const Video = mongoose.model("Video", videoSchema)

module.exports = Video