const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const mysql = require("mysql");
const dbConfig = require("./app/config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static('public'));

//allow express to access our html (index.html) file
app.get('/demo.html', function(req, res) {
  res.sendFile(__public + "/" + "demo.html");
});

// simple route
app.get('/user', function(req, res){
  
   connection.query('SELECT * from user_score', function (error, results, fields) 
  { 		if (error) throw error; 
          res.send(JSON.stringify({ results })); 
              
            });
                   
            }
            
);

// app.get('/user1', function(req, res){
//   response = {
//       user_id: req.query.user_id,
//       name : req.query.name,
//       score: req.query.score
//       };
//       console.log(response);
//       res.end(JSON.stringify(response));
//     });
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to quiz application." });
});

app.post('/user1', function(req, res){
  response = {
      user_id: req.body.user_id,
      name : req.body.name,
      score: req.body.score
  }
  
});


require("./app/routes/user.routes.js")(app);
// set port, listen for requests
app.listen(3008, () => {
  console.log("Server is running on port 3008.");
});