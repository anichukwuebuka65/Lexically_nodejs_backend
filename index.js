const express = require("express")
const app = express()
const proxy = require("./src/proxy")
const cors = require("cors")

app.use(cors({
    origin: "http://localhost:3000"
}))
app.use("*", proxy)

app.listen(4000,() => console.log("listen on port 4000"))