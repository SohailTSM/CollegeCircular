const express = require('express');
const mongoose = require('mongoose');
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');
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
app.use(express.urlencoded({ extended: true }));

//Route Middlewares
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);

//Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.get('/login', (req, res) => {});
