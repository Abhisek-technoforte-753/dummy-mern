
// console.log("Hello Students");

//   const {Sum,Subtract}= require("./app");
   
  
//   console.log(Sum(5,6));
//   console.log(Subtract(15,6));

// const os =require("os");

// console.log(os.totalmem());

//write file

// const fs= require("fs");

// fs.writeFileSync("test.txt","This is my first file created using cmd");

//  const data= fs.readFileSync("test.txt","utf-8")
// console.log(data);

// fs.appendFileSync("test.txt","\nAppended new text in file");

// fs.writeFileSync("test2.txt","hello world")
// fs.unlinkSync("test2.txt")
 
// if(fs.existsSync("test2.txt")){
//     console.log("exist")
// }else{
//     console.log("not exist")
// }

const http =require("http");

const server=http.createServer((req,res)=>{
  res.writeHead(200, { 'Content-Type': 'text/html' });
  
  
  if(req.url=="/"){
    res.end("Welcome to home page");
  }else if(req.url=="/about"){

    
    res.end("this is your about page");
  }else if(req.url=="/home"){
    res.end('<h1>Welcome to my Node.js HTML page!</h1><p>This is a basic example.</p>');
  }
});

server.listen(3000,()=>{
    console.log("server is running at 3000")
})
