const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const path = require("path");
const globalRouter = require("./router/globalRouter");
const reivewRouter = require("./router/reivewRouter");
const basketRouter = require("./router/basketRouter")
const loginRouter = require("./router/loginRouter");
const vsRouter = require("./router/vsRouter");
const { isBoxedPrimitive } = require("util/types");
const { url } = require("inspector");


const PORT = 4050;
const app = express();

app.set("view engine", "pug");
app.use(morgan("dev"));

app.use(
  session({
    secret: "bikestore",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/assets")));





app.use("/", globalRouter);
app.use("/review", reivewRouter);
app.use("/basket", basketRouter);
app.use("/signup", loginRouter);
app.use("/vs", vsRouter);


app.listen(PORT, () => {
  console.log(`${PORT} WAB SERVER START!`);
});
