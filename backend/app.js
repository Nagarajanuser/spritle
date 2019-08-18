const express = require("express");
const bodyparser = require("body-parser"); // parses your request and convert in to required fomat
const mongodb = require("mongodb").MongoClient;
//const jwt = require("jsonwebtoken");

const app = express();
const multer = require("multer"); 

app.use(bodyparser.json());   // it parses json

app.use((req, res, next)=>{
    console.log("Middleware2");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
   next();
});

app.get("/", (req, res)=>{
    res.send("Welcome to Express Homepage for Spritle");
});

var db;

mongodb.connect("mongodb://muthuspritle:muthuspritle1234@ds229474.mlab.com:29474/spritle", (error, database)=>{
    if(error)
    {
        console.log(error);
    }
    else {
        console.log("DB Connected");
    // console.log(database);
        db =  database;
    }
});


app.post("/signup", (req, res)=>{
    console.log(req.body);
    req.body._id = new Date().getTime();
    db.collection("users").save(req.body, (err, data)=>{
        if(err)
        {
            res.status(401).send("Something went wrong");
        }
        else {
            res.json("User Registered Sucessfully");
        }
    })
});

app.post("/login", (req, res)=>{

    console.log(req.body);


    db.collection("users").find(req.body, {_id:1, userEmail:1}).toArray((error, data)=>{
        console.log(data);
        if(error)
        {
            console.log(error);

            res.status(403).send("error in select query");
        }
        else {

            console.log(data);

            res.json(data);
        }

    })

   
});

app.get("/blogs", (req, res)=>{
    //res.json(blogListArray);
    db.collection("blogs").find().toArray((error, data)=>{

        if(error)
        {
            console.log(error);
            res.status(403).json("Error in Select query");
        }
        else {
            res.json(data);
        }
    })
    
});

var storage = multer.diskStorage({
    destination : (req, file, cb)=>{

        cb(null, "src/assets/blog_images")
    },
    filename : (req, file, cb)=>{

        cb(null, file.originalname+"-"+new Date().getTime()+".png")
    }
})
app.post("/addblog", multer({storage : storage}).single("blogImg"), (req, res)=>{

    // console.log(req.file.filename);
 
    req.body._id = new Date().getTime();
 
    
    req.body.blogImgPath = "assets/blog_images/"+req.file.filename;
 
    db.collection("blogs").save(req.body, (error, data)=>{
 
     if(error)
     {
         console.log(error);
 
         res.status(401).json("Error in Product insert query");
     }
     else {
         res.json("Product Added Successfully");
 
     }
 
    })
 
 });


 app.get("/singleblog/:catid", (req, res)=>{

    console.log(req.params.catid);


    db.collection("blogs").find( {_id : Number(req.params.catid)} ).toArray((error, data)=>{

        if(error)
        {
            console.log(error);
            res.status(403).json("Error in Select query");
        }
        else {
            res.json(data);
        }
    })

})

module.exports = app;
