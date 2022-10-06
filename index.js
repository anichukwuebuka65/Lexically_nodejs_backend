const express = require("express")
const app = express()
const proxy = require("./src/proxy")
const cors = require("cors")

app.use(cors({
    origin: "https://lexically.herokuapp.com"
}))
app.use("*", proxy)

app.listen(4000,() => console.log("listen on port 4000"))