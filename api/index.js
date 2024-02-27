//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");


app.use(cors());

app.get("/", (req, res) => {
  return res.send("Hello world!")
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
