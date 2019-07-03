const mongoose = require("mongoose")
const validator = require("validator")

const Schema = mongoose.Schema

const videoSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    thumbnailUrl: {
        required: true,
        type: String,
        trim: true,
        validate: {
            validator(url) {
                if(!validator.isURL(url)) throw new Error("invalid thumbnailUrl")
            }
        }
    },
    videoUrl: {
        required: true,
        type: String,
        unique: true,
        trim: true,
        validate: {
            validator(url) {
                if (!validator.isURL(url)) throw new Error("invalid videoUrl")
            }
        }
    },
    duration: {
        type: Number,
        required: true,
        min:0
    }
})

const Video = mongoose.model("Video", videoSchema)

module.exports = Video