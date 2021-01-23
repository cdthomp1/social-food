const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path');
require('dotenv').config()

const connectDB =  require('./config/db.js');


const app = express();

//Set Up the Assets Folder
app.use(express.static(path.join(__dirname, 'public')));

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = process.env.MONGO_URI;



connectDB();


// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');


// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/image', require('./routes/images.js'))
app.use('/api/v1', require('./api/api'));
app.use('/recipe', require('./routes/recipe'));

const PORT = process.env.PORT || 7472;

module.exports = app.listen(PORT, console.log(`Server started on port ${PORT}`));