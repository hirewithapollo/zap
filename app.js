const createError = require('http-errors');
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

require('dotenv').config()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? 'https://hirewithapollo.com' : '*',
  optionsSuccessStatus: 200,
};

app.options('/', cors(corsOptions))
app.post('/', cors(corsOptions), async (req, res) => {
  try {
    await fetch(process.env.ZAP_URL, {
      method: 'post',
      body:    JSON.stringify({ email: req.body.email, timestamp: new Date() }),
      headers: { 'Content-Type': 'application/json' },
    });

    return res.json('done');
  } catch {
    return res.json('error').status(500);
  }
});

app.use((req, res, next) => {
  next(createError(404));
});

module.exports = app;
