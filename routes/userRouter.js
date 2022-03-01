const express = require('express');
const { v4: uuidv4 } = require('uuid');

const knex = require('../db/dbconfig');

const userRouter = express.Router();

const activeSessions = []

userRouter.get('/:user', async (req, res) => {
  const user = await knex.where({
    email_address: req.params.user,
    password: req.query.password
  })
    .select('first_name', 'last_name', 'email_address')
    .from('users')
  if(user) {
    user[0].token = uuidv4();
    user[0].tokenStart = Date.now();
    activeSessions.push(user[0])
    res.status(200).json(user[0]);
  } else {
    res.sendStatus(404);
  }
});

userRouter.post('/', async (req, res) => {
  console.log(req.body)
  const user = await knex('users').insert({
    access_level: 'user',
    member_since: new Date(),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email_address: req.body.email_address,
    phone_number: req.body.phone_number,
    date_of_birth: req.body.date_of_birth,
    password: req.body.password
  });
  if(user.rowCount === 1) {
    res.sendStatus(201);
  } else {
    res.sendStatus(500);
  }
});

module.exports = userRouter;
