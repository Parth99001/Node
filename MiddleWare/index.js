const express = require("express");
const app = express();
const path = require("path");
const isAuthenticated = require("./middleware/middleware");
const port = 8080;

app.set("view engine", "ejs");
app.use(express.urlencoded())

app.get("/", (req, res) => {
  return res.render("login");
});

app.use(isAuthenticated);
app.post("/add",(req,res)=>{
    res.render("Home")
})

app.get("/Home", (req, res) => {
  return res.send("Contact page");
});

app.listen(port, (error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(`Server running on port ${port}`);
});