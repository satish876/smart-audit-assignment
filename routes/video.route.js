const express = require("express")
const validator = require("validator")
const VideoModel = require("../models/video.model")

const router = express.Router()

//endpoint to add new video
router.post("/", async (req, res) => {

    try {
        const { title, thumbnailUrl, videoUrl, duration } = req.body
        if (!validator.isURL(thumbnailUrl)) {
            return res.status(400).send({
                message: "invalid thumbnail url"
            })
        }

        if (!validator.isURL(videoUrl)) {
            return res.status(400).send({
                message: "invalid video url"
            })
        }

        const video = VideoModel({ title, thumbnailUrl, videoUrl, duration })

        await video.save()
        res.send(video)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

//endpoint to fetch video by id
router.get("/:id", async (req, res) => {
    try {
        const video = await VideoModel.findById(req.params.id)
        delete video._id
        res.send(video)
    } catch (error) {
        res.status(404).send({
            message: "video not found"
        })
    }
})

//endpoint to delete video by id
router.delete("/:id", async (req, res) => {
    try {
        if (!req.params.id) throw new Error()

        const video = await VideoModel.findByIdAndDelete(req.params.id)

        if (!video) throw new Error()
        res.send(video)
    } catch (error) {
        res.status(500).send({
            message: "Unable to delete"
        })
    }
})

module.exports = router