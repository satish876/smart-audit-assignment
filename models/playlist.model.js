const mongoose = require("mongoose")

const Schema = mongoose.Schema

const playlistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        required: true,
        type: String
    },
    videos: [{
        type: Schema.Types.ObjectId,
        ref: "Video"
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
    // to save to DB
    // this.videos = shuffledVideos;
    // await this.videos.save()
    return shuffledVideos
}

const Playlist = mongoose.model("Playlist", playlistSchema)

module.exports = Playlist