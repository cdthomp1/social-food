const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const api = require('./api/api')


var app = express();



app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
app.get('/login', (req, res) => { res.render('pages/login')})
app.get('/register', (req, res) => res.render('pages/register'))
app.get('/public', (req, res) => res.render('pages/public'))
app.get('/personal', (req, res) => res.render('pages/personal'))

//API 
app.get('/api/v1/getUsers', api.getUsers);

app.get('/users/:id', db.getUserById)


app.listen(PORT, () => console.log(`Listening on ${PORT}`))



