const express = require("express");
const exphbs  = require("express-handlebars");
const app = express();
const os = require("os");
const morgan  = require("morgan");
const ec2Info = require("ec2-info")

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.use(express.static("static"));
app.use(morgan("combined"));

// Configuration
const port = process.env.PORT || 8080;
const message = process.env.MESSAGE || "Hello world!";

// EC2 Info
const properties = ["meta-data/instance-id", "meta-data/instance-type"]
var instanceId = "loading"
var instanceType = "loading"

ec2Info(properties, (err, info) => {
  console.log("EC2 Instance Metadata Request Finished")
  if (err) {
    console.log("EC2 Instance Metadata Request Failed", error)
    instanceId = "error"
    instanceType = "error"
  } else {
    console.log("EC2 Instance Metadata Request Succeeded")
    instanceId = info.get("meta-data/instance-id")
    instanceType = info.get("meta-data/instance-type")
  }
})

app.get("/", function (req, res) {
  res.render("home", {
    message: message,
    platform: os.type(),
    release: os.release(),
    hostName: os.hostname(),
    instanceId: instanceId,
    instanceType: instanceType,
  });
});

// Set up listener
app.listen(port, function () {
  console.log("Listening on: http://%s:%s", os.hostname(), port);
});
