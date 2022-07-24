const express = require('express');
const mongoose = require('mongoose');
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');
const circularsRoutes = require('./routes/circularsRoutes');
const cookieParser = require('cookie-parser');
const path = require('path');

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
app.set('view engine', 'html');

// Middlewares
app.use(express.json());
// app.use(express.static('public'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//Route Middlewares
app.use('/api/register', registerRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/circulars', circularsRoutes);

//Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/index.html'));
});
