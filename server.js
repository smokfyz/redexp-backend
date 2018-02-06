const express = require('express');
const session = require('express-session');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db')
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: 'hello world',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.get('/', (req, res) => {
  console.log(req.sessionID);
  console.log(req.session.userId);
  res.sendFile(__dirname + '/index.html');
});

MongoClient.connect(db.url, (err, database) => {

  if(err) return console.log(err);
  require('./app/routes')(app, database.db('redexp'));

  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });

});
