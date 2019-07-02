const express = require("express")
const validator = require("validator")
const PlaylistModel = require("../models/playlist.model")

const router = express.Router()

//endpoint to add new playlist
router.post("/", async (req, res) => {
    try {
        const {name, url, videos } = req.body

        if (!validator.isURL(url)) {
            return res.status(400).send({
                message: "invalid video url"
            })
        }

        const playlist = PlaylistModel({
            name, url, videos
        })

        await playlist.save()
        res.send(playlist)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

//endpoint to fetch playlist videos by playlist id
router.get("/:id", async (req, res) => {
    try {
        await PlaylistModel.
            findById(req.params.id).
            populate('videos').
            exec(function (err, playlist) {
                console.log(playlist);
                if (err) return res.status(500).send();
                res.send({
                    videos: playlist.videos,
                    count: playlist.videos.length
                })
            });
    } catch (error) {
        res.status(404).send({
            message: "playlist not found"
        })
    }
})

//endpoint to delete playlist by id
router.delete("/:id", async (req, res) => {
    try {
        if (!req.params.id) throw new Error()

        const playlist = await PlaylistModel.findByIdAndDelete(req.params.id)

        if(!playlist) throw new Error()
        res.send(playlist)
    } catch (error) {
        res.status(500).send({
            message: "Unable to delete playlist"
        })
    }
})

//just to test if shuffling worked or not

// router.get("/:id/shuffle", async (req, res) => {
//     try {
//         const playlist = await PlaylistModel.findById(req.params.id)
//         const result = await playlist.shufflePlaylist()
//         res.send(result)
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

module.exports = router