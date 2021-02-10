const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user');

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

router.post('/users', (req, res, next) => {
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

})
/* router.post("/singup", (req, res, next) => {

  bcrypt.hash(req.body.password, 10)
    .then(hast => {
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
}); */

router.get('/users', (req, res, next) => {
  res.send("User");
})

module.exports = router;