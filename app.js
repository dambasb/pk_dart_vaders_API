const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const db = require('./db')

const User = require('./models/users');

const app = express();

mongoose.connect('mongodb+srv://' + db.user + ':' + db.password + '@pk-dart-vaders-api.kilap.mongodb.net/<dbname>?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!')
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.send('Hello World');
  next();
});

app.post("/api/users", (req, res, next) => {
  res.send('POST');
})

module.exports = app;