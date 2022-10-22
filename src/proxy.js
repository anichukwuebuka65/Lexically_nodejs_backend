const express = require("express")
const router = express.Router()
const axios = require("axios")

router.get("/", (req, res) => {
    const params = new URLSearchParams({
        client_id: process.env.CLIENT_ID,
        ...req.query
    })
    const BASE_URL = `https://api.unsplash.com${req.baseUrl}?${params}`

    axios.get(BASE_URL)
    .then((response) => {
        res.header(response.headers)
        res.status(200).json(response.data)
    })
    .catch(err => {
      res.status(500).end(err.message)
    })
})

module.exports = router