const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

let app = express();

app.get('/', function(req, res) {
  res.sendFile('index.html', {root: __dirname});
});

app.listen(3000, function(){
  console.log('Listening on port 3000');
});
