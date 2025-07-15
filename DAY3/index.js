
const express =require("express");

const app = express();
app.use(express.json())



app.get("/",(req,res,next)=>{
    res.status(200).send("Hello Skillians you are here");
    //logic this did not work show some error 400 401
    
    });

app.get("/users",(req,res)=>{
    res.send({"name":"Abhisek"});
    });

app.post("/users",(req,res)=>{
    const newUser=req.body;
    console.log(newUser);
    //save this data in database;
    
    console.log("new user Data",newUser);
    res.send({message:"new user",user:newUser.postname});
});

app.get("/post",(req,res)=>{
    res.send({"postname":"Abhisek Feed","id":"3"});
    });

app.post("/post",(req,res)=>{
    const newPost=req.body;
    //save this data in database and logic;
    
    console.log("new user Data",newPost)
    res.send({message:"new post is available",userId:newPost.Id});
});

//Create a post route to post data {postname,url,id,category};
//get api to get static json post 


app.listen(3001,()=>{
    console.log("Server is running on port 3001")
});