const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config({path: './config/config.env'});

connectDB();

const users = require('./api/user-api');
const recipes = require('./api/recipe-api');

var app = express();

app.use(express.json());
/* app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
app.get('/login', (req, res) => { res.render('pages/login')})
app.get('/register', (req, res) => res.render('pages/register'))
app.get('/public', (req, res) => res.render('pages/public'))
app.get('/personal', (req, res) => res.render('pages/personal')) */

//API 

app.use('/api/v1/users', users);
app.use('/api/v1/recipes', recipes);


app.listen(PORT, () => console.log(`Listening on ${PORT}`))



