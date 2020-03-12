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

})
app.get('/login-succ', (req, res) => { 
  
  var email = req.query.email;
  var password = req.query.password
  var users = getUsers();
  checkIfExist(email, password, users)
  res.render('pages/login-succ')
})
app.get('/register', (req, res) => res.render('pages/register'))
app.get('/public', (req, res) => res.render('pages/public'))
app.get('/personal', (req, res) => res.render('pages/personal'))
app.listen(PORT, () => console.log(`Listening on ${PORT}`))



async function getUsers() {
  const sql = "SELECT user_id, user_name, user_email, user_password FROM social_user";
  var users = await pool.query(sql, function (err, result) {
    // If an error occurred...
    if (err) {
      console.log("Error in query: ")
      console.log(err);
    } else {
      var results = result.rows
      return results;
    }
  });

  return users;
}


function checkIfExist(username, password, users) {
  console.log(username, password, users);
}