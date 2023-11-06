
const {MongoClient} = require('mongodb')
let dbConnection
//let uri='mongodb://127.0.0.1:27017/user-account'
let uri='mongodb+srv://marcosanoandrea:9124@firstsite.qswbnir.mongodb.net/?retryWrites=true&w=majority'
//initiate connection to db

module.exports = {
    connectToDb:(cb)=>{//cb=callback function  function to run after connection is enstablished
        MongoClient.connect(uri)
            .then ((client)=>{
                dbConnection= client.db()
                return cb()
            })
            .catch((err)=>{
                console.error(err)
                return cb(err)
            })
    },
    getDb: ()=> dbConnection //reconnect to db after it has already been connected to
}