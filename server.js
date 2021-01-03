const express = require('express');
const app = express();
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const mongoose = require('mongoose');
const cors = require('cors');

///////////////////////////////////////

var allowedOrigins = ['http://localhost:3000',
                      'http://yourapp.com'];

app.use(cors({
origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
    var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
    return callback(new Error(msg), false);
    }
    return callback(null, true);
}
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


//Connection to mongo 
mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true , useUnifiedTopology: true } , 
    (err) => { // check for db errors 
        if (!err) {
            console.log('Connected to MongoDB Atlas') 
        }
        else {
            console.log('Failed connect with MongoDB Atlas with Error: '+ err)
        }
    });


// Import routes
let apiRoutes = require("./api-routes");
// Use Api routes in the App --> current version 1.0 
app.use('/api/v1', apiRoutes);
    
//const db = mongoose.connection;
  

app.listen(process.env.PORT, function() {
    console.log(`listening on ${process.env.PORT}`)
  })
