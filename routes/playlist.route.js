const express = require("express")
const VideoModel = require("../models/video.model")

const router = express.Router()

router.post("/", async (req, res) => {

    try {
        const { title, thumbnailUrl, videoUrl, duration } = req.body
        const video = VideoModel({ title, thumbnailUrl, videoUrl, duration })

        await video.save()
        res.send(video)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})

module.exports = router