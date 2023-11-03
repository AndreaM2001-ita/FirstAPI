
const {MongoClient} = require('mongodb')
let dbConnection
//initiate connection to db

module.exports = {
    connectToDb:(cb)=>{//cb=callback function  function to run after connection is enstablished
        MongoClient.connect('mongodb://127.0.0.1:27017/user-account')
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