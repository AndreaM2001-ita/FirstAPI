/*const express = require('express') //init node

const http=require('http')
const fs=require('fs')
const port = 3000//what port we are going to be listening to for our server 


const MongoClient = require('mongoose')
//init app adn middleware
const app = express()
app.use(express.json())//pass any json coming from the request

const uri = 'mongodb+srv://marcosanoandrea:9124@firstsite.qswbnir.mongodb.net/?retryWrites=true&w=majority'
const databaseName = 'user-account'

function sendFile(fileName, content,res) {
    fs.readFile(fileName,function(error,data){
        if(error){
            res.writeHead(404)
            res.write('Files not found')
        }
        else{
            res.writeHead(200,{'Content-Type':content}) //tells the browser that info from server are in HTML format
            res.write(data)//reading the whole HTML and write it on webpage
        }
        res.end();
    });
}

const server = http.createServer(function(req,res){
    console.log('Request URL:', req.url);
    if(req.url==="/"){
        sendFile('index.html','text/html',res)
    }
    else if(req.url==="/sitoCss.css"){
        sendFile('sitoCss.css','text/css',res)
    }
    else {
        res.statusCode = 404;
        res.end();
    } 
});

//function to only connect to db 
/*async function connect(){
    try{
        await MongoClient.connect(uri)
        console.log("Connected to MongoDB");

        let db = client.db(databaseName);

    }catch(error){
        console.error(error)
    }
}*/

//connect();


//routes


/*
app.post('/update-profile', function(req,res){
    const profile=req.body
    try{
        MongoClient.connect(uri,function(error,client){
            console.log("Connected to MongoDB");

             let db = client.db(databaseName);
            
             db.collection('user')
                 .insertOne(profile)
                 .then(result=>{
                     res.status(201).json(result)
                 }).catch(error=>{
                     res.status(500).json({err:'Could not create user'})
                 });
        })}catch(error){
        console.error(error)} 
})

server.listen(port, function(error){
    if(error){
        console.log('Error... ',error)
    }
    else{
        console.log('Server is listening on port '+ port)
    }
})

app.get('/user', (req, res)=>{
    res.json({mssg: "welsome to the api"})
});*/

const express = require('express') //init node
const {ObjectId} = require('mongodb')
const {connectToDb,getDb}=require('./db')

const http=require('http')
const fs=require('fs')

const path = require('path');

let db 

const app=express()
app.use(express.json())//pass any json coming from the request

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });
app.get('/sitoCss.css', (req, res) => {
    res.sendFile(path.join(__dirname,'sitoCss.css'));
});

//database connection
connectToDb((err)=>{
    if(!err){
        app.listen(3000, ()=>{
            console.log('Serving on port 3000')
        })
        db=getDb()
    }
    
})

//routes
app.get('/user',(req,res)=>{
    let users=[]

    db.collection('user')
      .find()
      //.sort({name:1})
      .forEach(user=>users.push(user))
      .then(()=>{
        res.status(200).json(users)
      })
      .catch(()=> {
        res.status(500).json({err:"could not fetch the documents"})
      })

})

app.get('/user/:name',(req,res)=>{  //:name is the interchanbale route parameter

        db.collection('user')
        .findOne({name: req.params.name})
        .then(doc=>{
                res.status(200).json(doc)
        })
        .catch(err=> {
            res.status(500).json({error:"could not fetch the documents"})
        })
})

app.post('/user-update', function(req,res){//update current users
    const userObj=req.body
    let myquery = { name: req.body.name }
    let newvalues = { $set: userObj };

    db.collection('user')
    .updateOne(myquery, newvalues, { upsert: true })
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({error:"could not update the documents"})
    })
})