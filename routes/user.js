const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const user = require('../models/user');

const router = express.Router();

router.get('/test', (req, res, next) => {
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
  console.log(userTest);
  res.status(200).json({
    message: 'Test user',
    users: userTest
  });
  next();
})

router.post("/singup", (req, res, next) => {

  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash
      });

      user.save()
        .then(result => {
          res.status(201).json({
            message: 'User created!',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          })
        });
    })
});

router.post('/login', (req, res, next) => {

  User.findOne({ email: req.body.email })
    .then(user => {
      console.log(user);
      if (!user) {
        return res.status(401).json({
          massage: 'Auth failed'
        });
      }

      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          massage: 'Auth failed'
        });
      }
      const token = jwt.sign(
        { email: user.email, userId: user._id },
        'some_secret_random_jwt_code',
        { expiresIn: '1h' }
      );
      res.status(200).json({
        token: token
      })
    })
    .catch(err => {
      return res.status(401).json({
        massage: 'Auth failed',
        error: err
      });
    })
});

router.get('/users', (req, res, next) => {
  res.send("User");
})

module.exports = router;