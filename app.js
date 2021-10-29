const express = require("express");
const morgan = require("morgan");
const path = require("path");
const globalRouter = require("./router/globalRouter");
const reivewRouter = require("./router/reivewRouter");

const PORT = 4050;
const app = express();

app.set("view engine", "pug");
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/assets")));

app.use("/", globalRouter);
app.use("/review", reivewRouter);

app.listen(PORT, () => {
  console.log(`${PORT} WAB SERVER START!`);
});
  