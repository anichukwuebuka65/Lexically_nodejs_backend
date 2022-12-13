const express = require("express");
const app = express();
const proxy = require("../src/proxy");
const cors = require("cors");
const { default: axios } = require("axios");
require("dotenv").config();
const backendUrl = "https://lexically-nodejs-backend.vercel.app/";
const frontendUrl = "https://lexically-react-frontend.vercel.app/";

app.options("*", cors());

app.get("/redirect", (req, res) => {
  res.redirect(
    `https://unsplash.com/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${backendUrl}/user&response_type=code&scope=public+read_user+read_collections`
  );
});

app.get("/user", (req, res) => {
  if (req.query.code) {
    axios
      .post("https://unsplash.com/oauth/token", {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: `${backendUrl}/user`,
        code: req.query.code,
        grant_type: "authorization_code",
      })
      .then((result) => {
        res.redirect(
          `${frontendUrl}/my-collections?token=${result.data.access_token}`
        );
      })
      .catch((err) => {
        console.log(err);
        res.redirect(`${frontendUrl}/my-collections?token=error`);
      });
  } else {
    res.redirect(`${frontendUrl}`);
  }
});
app.get("/hello", () => res.send("hello"));
app.use("*", proxy);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("listen on port 5000"));

module.exports = app;
