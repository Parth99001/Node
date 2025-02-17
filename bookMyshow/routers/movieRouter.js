const express  = require('express')
const UserModel = require('../models/UserModel')
const movieRouter = express.Router();
const multer = require("multer")
const path = require("path")
const upload = "/upload";
const fs = require('fs')

movieRouter.get("/",async (req,res)=>{
    const movie = await UserModel.find();  
    console.log(movie);
    
    res.render("main", { movie })
})

movieRouter.get("/add",(req,res)=>{
    res.render("add")
})
movieRouter.get("/deleteData/:id",async (req,res)=>{
    const id = req.params.id;
    const movieData = await UserModel.findById(id);
    console.log(movieData);
    // return
    try{
  
      if(movieData){

        fs.unlinkSync(path.join(__dirname ,"..","upload/", movieData.image));
        
      }
      await UserModel.findByIdAndDelete(id);
        console.log("Movie deleted successfully");
        res.redirect("back")
    }catch(err){
  console.log(err);
  res.redirect("back")
    }
  })



movieRouter.get("/editData/:id",async (req,res)=>{
  try {
    let movieData = await UserModel.findById(req.params.id);
    res.render("editForm",{movieData})
  } catch (error) {
    console.log(error);
    res.redirect("back")
  }
});

movieRouter.post("/updateData/:id", UserModel.multer,async (req,res)=>{
  try {
    let movieData = await UserModel.findById(req.params.id);
    console.log(req.file)
       if (req.file) {
        fs.unlinkSync(path.join(__dirname ,"..","upload/", movieData.image));
          req.body.image =  "/" + req.file.filename;
        }
    
       await UserModel.findByIdAndUpdate(req.params.id, req.body);
       console.log("user updated successfully");
       res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("back")
  }
})

movieRouter.post("/add", UserModel.multer, async (req, res) => {
    console.log("File:", req.file);  
    console.log("Body:", req.body);  

    try {
        if (req.file) {
            req.body.image = req.file.filename;  
            console.log(req.file);
        }

        await UserModel.create(req.body);  
        console.log("Movie Added");
        res.redirect("/");
    } catch (err) {
        console.log("Error:", err);
        res.send("Error adding movie.");
    }
});




module.exports = movieRouter;