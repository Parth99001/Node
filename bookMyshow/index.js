const express = require('express');
const app = express()
const path = require('path');
const movieRouter = require('./routers/movieRouter')
const connection = require('./config/db');

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use("/upload", express.static(path.join(__dirname, "/upload")));

app.use("/",movieRouter)
    
app.listen(8090,(err)=>{
    if(err)
    {
    console.log("Error starting the server:", err);
    return;
  }else{
    connection()
  console.log("Server is running on port 8090");
  }
})