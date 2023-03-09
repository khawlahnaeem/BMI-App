const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const fs = require("fs");

//Load the bmi file
let rawData = fs.readFileSync("bmi.json");
let data = JSON.parse(rawData);

app.set("views", "views");
app.set("view engine", "hbs");
app.use(express.static("public"));

app.get("/", function (request, response) {
  response.render("home", { name: "John Doe" });
});

app.get("/contacts", function (request, response) {
  response.render("contact_us");
});

app.get("/report", function (request, response) {
  response.render("reports");
});

app.get("/get-bmi", (request, response) => {
  response.send(data);
});

app.post("/process-contacts", urlEncodedParser, function (request, response) {
  const { weight, height } = request.body;
  const bmi = parseInt(weight) / parseFloat(height) ** 2;
  var variable;
  if (bmi <= 18) {
    variable = "You are underweight";
  } else if (bmi > 18 && bmi <= 25) {
    variable = "You are healthy";
  } else {
    variable = "You are overweight";
  }

  const info = {
    bmi: bmi,
  };
  data.push(info);

  fs.writeFileSync("bmi.json", JSON.stringify(data));

  response.end("Your bmi is: " + bmi + " " + variable);
});

app.post("/process-reports", urlEncodedParser, function (request, response) {
  response.end("Your bmi is: " + bmi);
});

app.listen(port);
console.log("server is listening on port 3000");
