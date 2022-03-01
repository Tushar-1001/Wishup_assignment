const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const route = require("./routes/route");

const app = express();

// app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", route);

mongoose
  .connect("mongodb+srv://TSDB:TSDB123@cluster0.s97ln.mongodb.net/WishUp_Assignment", {
    useNewUrlParser: true,
  })
  .then(() => console.log("Wishup Assignment - Subscripion as a Sevice"))
  .catch((err) => console.log(err));

app.listen(3000, function () {
  console.log("Express app running on port " + 3000);
});
