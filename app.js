const createError = require('http-errors');
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const router = express.Router();
router.post('/', function(req, res, next) {
  const email = req.body.email;
  const timestamp = new Date();
  console.log(email);
  console.log(timestamp);
  return res.json('done');
});

app.use('/', router);

app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
