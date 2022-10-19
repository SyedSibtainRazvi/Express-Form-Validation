const express = require("express")
const app = express()

const bodyparser = require("body-parser")
const path = require("path")

const { check, validationResult } = require("express-validator")

const port = process.env.port || 3000

// Setting up View Engine for test purposes

app.set("views", path.join(__dirname))
app.set("view engine", "ejs")

// Setting up middleware
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.get("/", function (req, res) {
    res.render("Form")
})

app.post("/validate", [
    check("title", "titile shuld have length").isLength({ min: 5, max: 20 }),
    check("questions", "question should not be empty").not().isEmpty(),
    check("members", "members should have length").isLength({ min: 5, max: 20 }),
    check("channel", "channel should not be empty").not().isEmpty(),
] 
), (req, res) => {
    const errors = validationResult(req)
    console.log("Hello");

    if (!errors.isEmpty()) {
       return res.status(404).json(errors)
    }
    else {
        res.send("Form Validated Successfully")
    }
}

app.listen(port, function (error) {
    if (error) throw error
    console.log("Server", port)
})
