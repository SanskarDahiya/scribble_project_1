const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const { uri: mongoDbURL } = require("./demo");
const userRoute = require("./routes/userRoute");
const scribbleRoute = require("./routes/scribbleRoute");
const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use("/user", userRoute);
app.use("/scribble", scribbleRoute);
mongoose.connect(mongoDbURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) console.log("Unable to connect database");
  //   else console.log("Db Conn");
});

app.all("/", async (req, res) => {
  res.send("INITIATIVE IS RUNNING");
});
app.all("*", async (req, res) => {
  // All Extra pages
  res.sendStatus(401);
});
console.log("Starting Server NOW");
console.log(JSON.stringify(process.env));

const port = process.env.PORT || 9797;
const server = app.listen(port, "0.0.0.0", () => {
  console.log("Server is start:\n" + JSON.stringify(server.address()));
});
