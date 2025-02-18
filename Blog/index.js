const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const userModel = require("./models/userModel");
const connection = require("./config/db");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());

app.get("/register", (req, res) => {
  let getData = req.cookies.userData;
  if (!getData) {
    res.render("register");
  } else {
    res.redirect("/");
  }
});

app.post("/createData", async (req, res) => {
  console.log(req.body);
  try {
    await userModel.create({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password, 
    });
    console.log("user Added");
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

app.get("/", (req, res) => {
  let getData = req.cookies.userData;
  if (!getData) {
    res.redirect("/login");
  } else {
      res.render("/");
  }
});
app.get("/login", (req, res) => {

  let getData = req.cookies.userData;
  if (!getData) {
    res.render("login");
    } else {
    res.redirect("/");
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email, password });
    console.log(user);
    if (user) {
      res.cookie("userData", user);
      console.log("done");
      res.redirect("/");
    } else {
      console.log("invalid");
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(8080, (error) => {
  if (error) {
    console.log(error);
    return;
  }
  connection();
  console.log("Server is running on port 8080");
});
