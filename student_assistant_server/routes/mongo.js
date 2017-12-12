var MongoClient = require('mongodb').MongoClient;
var db;
var connected = false;
let url1= "mongodb://student:student@studentassistantsystem-shard-00-00-5nj8l.mongodb.net:27017,studentassistantsystem-shard-00-01-5nj8l.mongodb.net:27017,studentassistantsystem-shard-00-02-5nj8l.mongodb.net:27017/student_assist?ssl=true&replicaSet=studentassistantsystem-shard-0&authSource=admin"

/**
 * Connects to the MongoDB Database with the provided URL
 */
exports.connect = function(url, callback){
    MongoClient.connect(url1, {poolSize: 10}, function(err, _db){
        if (err) { throw new Error('Could not connect: '+err); }
        db = _db;
        connected = true;
        console.log(connected +" is connected?");
        callback(db);
    });
};

/**
 * Returns the collection on the selected database
 */
exports.collection = function(name){
    if (!connected) {
        throw new Error('Must connect to Mongo before calling "collection"');
    }
    return db.collection(name);
};