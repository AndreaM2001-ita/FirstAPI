const {MongoClient} = require('mongodb')
let dbConnection
//let uri='mongodb://127.0.0.1:27017/user-account'  conncting to db locally with mongocompass
//let uri='mongodb+srv://marcosanoandrea:9124@firstsite.qswbnir.mongodb.net/?retryWrites=true&w=majority'// connecting through mongo atlas
//let uri = 'mongodb://marcosanoandrea:9124@localhost:27017'  //connecting to mongo db through mongo express 

let uri = 'mongodb://marcosanoandrea:9124@localhost:27017'// connect to mongo db within a container 

//initiate connection to db


// pass these options to mongo client connect request to avoid DeprecationWarning for current Server Discovery and Monitoring engine
let mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

module.exports = {
    connectToDb:(cb)=>{//cb=callback function  function to run after connection is enstablished
        MongoClient.connect(uri,mongoClientOptions)
            .then ((client)=>{
                console.log('WOKRINGH')
                dbConnection= client.db('user-account')//NAME OF DATABASE IS IMPORTANT
                if(dbConnection){console.log('WOKRINGH')}
                
                return cb()
            })
            .catch((err)=>{
                console.error(err)
                return cb(err)
            })
    },
    getDb: ()=> dbConnection //reconnect to db after it has already been connected to
}