const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString: connectionString });


var app = express();

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
app.get('/login', (req, res) => { res.render('pages/login') 
  getUsers(1);

})
app.get('/login-succ', (req, res) => res.render('pages/login-succ'))
app.get('/register', (req, res) => res.render('pages/register'))
app.get('/public', (req, res) => res.render('pages/public'))
app.get('/personal', (req, res) => res.render('pages/personal'))
app.listen(PORT, () => console.log(`Listening on ${PORT}`))



function getUsers(id) {

  const sql = "SELECT user_id, user_name FROM social_user WHERE user_id = $1::int";

  const params = [id];

  pool.query(sql, params, function (err, result) {
    // If an error occurred...
    if (err) {
      console.log("Error in query: ")
      console.log(err);
    }

    console.log("Found result: " + JSON.stringify(result.rows))

  });

}
