const express = require("express")
const app = express()
const proxy = require("./src/proxy")
const cors = require("cors")
const { default: axios } = require("axios")
require("dotenv").config()

app.use(cors({
    origin: "*"
}))

app.get("/redirect",(req, res) => {
     res.redirect(`https://unsplash.com/oauth/authorize?client_id=${process.env.client_id}&redirect_uri=http://localhost:5000/user&response_type=code&scope=public+read_user+read_collections`)

})

app.get("/user",(req, res) => {
    if(req.query.code) {
        axios.post("https://unsplash.com/oauth/token",{
            client_id: process.env.client_id,
            client_secret: process.env.client_secret,
            redirect_uri : "http://localhost:5000/user",
            code: req.query.code,
            grant_type: "authorization_code"
        })
        .then(result => {
            res.redirect(`http://localhost:3000?token=${result.data.access_token}`)
        })
        .catch(err => {
            console.log(err)
            res.send(err)})
    } else {
        res.end("authentication failed")
    }
})
app.use("*", proxy)

const PORT = process.env.PORT || 5000
app.listen(PORT,() => console.log("listen on port 5000"))