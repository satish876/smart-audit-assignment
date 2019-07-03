const mongoose = require("mongoose")
const validator = require("validator")
const VideoModel = require("./video.model")

const Schema = mongoose.Schema

const playlistSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
        unique: true
    },
    url: {
        required: true,
        type: String,
        trim: true,
        unique: true,
        validate: {
            validator(url) {
                if (!validator.isURL(url)) throw new Error("invalid playlist url")
            }
        }
    },
    videos: [{
        type: Schema.Types.ObjectId,
        ref: "Video",
        validate: {
            async validator(videoId) {
                const video = await VideoModel.findById(videoId.toString())
                if (!video) throw new Error(`video with id ${videoId.toString()} doesn't exist`)
            }
        }
    }]
})

playlistSchema.methods.shufflePlaylist = async function () {
    //generate an array of random indices
    //shuffling logic: generate 'N' random numbers in the range of 0 - N
    //here N is number of videos
    //accept a newly generated random number if it wasn't generated before  
    // to do this, we can save a newly generated number to an array and see if it already exists

    let shuffledIndexArr = [], randomNumber
    while (shuffledIndexArr.length < this.videos.length) {
        randomNumber = parseInt(Math.random() * this.videos.length)
        if (shuffledIndexArr.indexOf(randomNumber) === -1) {
            shuffledIndexArr.push(randomNumber)
        }
    }

    //this contains the shuffeled videos
    const shuffledVideos = shuffledIndexArr.map(index => this.videos[index])
    
    //saving the shuffled result to DB,
    //next time we fetch all the videos using /GET, we will get shuffled result

    // this.videos = shuffledVideos;
    // await this.videos.save()
    // return shuffledVideos
}

const Playlist = mongoose.model("Playlist", playlistSchema)

module.exports = Playlist