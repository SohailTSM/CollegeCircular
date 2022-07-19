const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const app = express();

// DB Connection
mongoose
  .connect(process.env.DB_CONNECTION, { dbName: 'CollegeCircular' })
  .then(
    app.listen(3000, () =>
      console.log('Server is running on http://localhost:3000')
    )
  )
  .catch((err) => console.log(err));

// Settings
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));

//Route Middlewares

//Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.get('/login', (req, res) => {});

app.get('/register', (req, res) => {});
