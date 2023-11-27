const express = require("express");
const app = express();
const mongoose = require("mongoose");
const data = require("./Schema");
const bcrypt = require("bcryptjs");
const database = "mongodb+srv://Sai5685:Sai568599@cluster.y3rescu.mongodb.net/MyDatabase?retryWrites=true&w=majority";
mongoose.connect(database)
    .then((result) => {
        console.log("Database Connected");
        app.listen(5001);
    })
    .catch((error) => {
        console.log(error);
    });
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("statics"));


app.get("/", (req, res) => {
    res.render("Toggl", { user: "" });
});


app.get("/log-in", (req, res) => {
    res.render("LPage", { userExists: 0 });
});
app.post("/log-in", (req, res) => {

    data.find({
        inputEmail: req.body.inputEmail,
    })
        .then((result) => {

            bcrypt.compare(req.body.inputPassword, result[0].inputPassword, function (err, data) {
                if (err) {
                    console.log(err);
                }
                if (data) {
                    res.redirect("/");
                }
                else {
                    res.render("LPage", { userExists: 1 });
                }
            });
        })
        .catch((error) => {
            res.redirect("/");
        });
});


app.get("/sign-up", (req, res) => {
    res.render("SPage");
});
app.post("/sign-up", (req, res) => {
    bcrypt.genSalt(10, function (err, Salt) {
        bcrypt.hash(req.body.inputPassword, Salt, function (err, hashed) {
            req.body.inputPassword = hashed;
            const Data = new data(req.body);
            Data.save()
                .then((result) => {
                    res.redirect("/log-in");
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    });
});


app.get("/delete", (req, res) => {
    res.render("DPage", { userExists: 0 });
});
app.post("/delete", (req, res) => {

    data.find({
        inputEmail: req.body.inputEmail
    })
        .then((result) => {

            bcrypt.compare(req.body.inputPassword, result[0].inputPassword, function (e, d) {
                if (e) {
                    console.log(e);
                }
                if (d) {

                    data.findByIdAndDelete(result[0]._id)
                        .then(() => {
                            res.redirect("/");
                        })
                        .catch((emo) => {
                            console.log(emo);
                        })

                }
                else {
                    res.render("DPage", { userExists: 1 });
                }
            });
        })
        .catch((error) => {
            res.redirect("/");
        })
});

app.use((req, res) => {
    res.send("Page Doesn't Exist");
});

