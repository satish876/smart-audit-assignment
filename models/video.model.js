const mongoose = require("mongoose")

const Schema = mongoose.Schema

const videoSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 3
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
        required: true,
        min:0
    }
})

const Video = mongoose.model("Video", videoSchema)

module.exports = Video