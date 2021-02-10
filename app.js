const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const db = require('./db')

const usersRoutes = require('./routes/user');

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
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use('/api/users', usersRoutes);

/* app.post('/api/users', (req, res, next) => {
  const user = {
    firstName: 'Test',
    lastName: 'Test',
    email: 'Test',
    password: 'Test'
  }

  console.log(user);

  res.status(201).json({
    message: 'User  added!'
  });

}) */

/* app.use('/api/users', (req, res, next) => {
  const userTest = [
    {
      firstName: 'Test',
      lastName: 'Test',
      email: 'Test',
      password: 'Test'
    },
    {
      firstName: 'Test',
      lastName: 'Test',
      email: 'Test',
      password: 'Test'
    }
  ];

  res.status(200).json({
    message: 'Test user',
    users: userTest
  });
  next();
}) */

module.exports = app;