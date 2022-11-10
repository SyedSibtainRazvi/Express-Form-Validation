const express = require("express");
export const app = express();

const bodyparser = require("body-parser");
const path = require("path");

const { body, validationResult } = require("express-validator");

const port = process.env.port || 3000;

// Setting up View Engine for test purposes

app.set("views", path.join(__dirname));
app.set("view engine", "ejs");

// Setting up middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get("/", function (req, res) {
  res.render("Form");
});

const validateStandup = [
  body("title", "titile shuld have length").notEmpty(),
  body("questions", "question should not be empty").not().isEmpty(),
  body("channel", "channel should not be empty").not().isEmpty(),
  body("members", "members should have length").isLength({ min: 5, max: 20 }),
];

app.post("/validate", validateStandup,
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(404).json(errors);
    } else {
      res.status(200).send("Form Validated Successfully");
    }
  });

app.listen(port, function (error) {
  if (error) throw error;
  console.log("Server", port);
});