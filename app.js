const express = require('express') // Include ExpressJS
const app = express() // Create an ExpressJS app
const bodyParser = require('body-parser'); // Middleware
const crypto = require("crypto")
const colors = require("colors")
const user = require("./user")
const mongoose = require("mongoose")
const { Schema } = mongoose;
const InitiateMongoServer = require("./db");
InitiateMongoServer();
var usernames = []
var passwords = []
var loggedinusers = []

const router = express.Router();
var logincode = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta charset="utf-8">
<title>Signup</title>
<link rel="stylesheet" href="css/normalize.css">
<link href='http://fonts.googleapis.com/css?family=Changa+One|Open+Sans:400italic,700italic,400,700,800' rel='stylesheet' type='text/css'>
<link rel="stylesheet" href="css/main.css">
</head>
  <body>
  <h1>User already exist!</h1>
  <button style="float: right;font-size: xx-large;" onclick="home()">Home</button>
	<script>
		function home(){
			location.replace("/")
		}
	</script>
	<form action="/signup" method="post">
  	<!-- user input-->
  	Username:<br>
  	<input type="text" name="username" placeholder="Username" required><br><br>
  	Password:<br>
  	<input type="password" name="password" placeholder="Password" required><br><br>
  	<!-- submit button -->
  	<input type="submit" value="login">
	</form>
  </body>
</html>`
app.use(bodyParser.urlencoded({ extended: false }));

// Route to Homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/index.html');
});

// Route to Login Page
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/static/login.html');
});
app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/static/signup.html');
});

app.post('/login', (req, res) => {
  // Insert Login Code Here
  var username = req.body.username;
  var password = req.body.password;
  var loginschema = new Schema({
    username: String,
    password: String
});
var loginmodel = mongoose.model("auth-collection", loginschema);
loginmodel.find(
  { username: username },
  async (err, data) => {
    console.log(data.map(doc => doc.map).sort())
    if (err) console.log(err);
    if (!data.length){
                return res.sendFile(__dirname + "/static/notcorrect.html")
    }
    else{
      
    }
              }
)
  if(usernames.includes(username) && passwords.includes(crypto.createHash('md5').update(password).digest("hex")) || loggedinusers.includes(username)){
    loggedinusers.push(username)
    res.send(`
    
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="utf-8">
    <link rel="stylesheet" href="css/normalize.css">
    <link href='http://fonts.googleapis.com/css?family=Changa+One|Open+Sans:400italic,700italic,400,700,800' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="css/main.css">
    <script>
      function signout() {
        location.replace("/login")

      }
    </script>
  
  <h2>Successfully logged in as ` + username + `</h2>
  <button onclick="signout()">Signout</button>`)
    console.log("User logged in!".bgGreen.black + "Username: " + username + ", Hash: " + crypto.createHash('md5').update(password).digest("hex"))
  }
  else{
    res.sendFile(__dirname + "/static/notcorrect.html")
    console.log("User login failed!".bgRed + "Incorrect username or password. Username: " + username + ", Hash: " + crypto.createHash('md5').update(password).digest("hex"))

  }
  
});
app.post('/signup', (req, res) => {
  // Insert Login Code Here
  var username = req.body.username;
  var password = req.body.password;
  
  if(!usernames.includes(username)){


var usrschema = mongoose.Schema({
  date: String, username: String, password: String
});

var Model = mongoose.model("model", usrschema, "auth-collection");

var usersave = new Model({ 
  date: Date(),
  username: username, 
  password: crypto.createHash('md5').update(password).digest("hex") 
});
usersave.save(function(err, doc) {
  if (err) return res.send("Error: " + err)
  res.send("<script>location.replace(\"/login\")</script>")
  console.log("New user created!".bgYellow.black + "Username: " + username + ", Hash: " + crypto.createHash('md5').update(password).digest("hex"))
});
 
  }
  else{
    res.send(logincode)
    console.log("User tried to make an account that already existed!")
  }
  

});

const port = 1234 // Port we will listen on

// Function to listen on the port
app.listen(port, () => console.log(`This app is listening on port ${port}`));
