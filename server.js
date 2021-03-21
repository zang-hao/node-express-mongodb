const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//loading static file
const path = __dirname + '/app/views'
app.use(express.static(path))

var corsOptions = {
  origin: ["http://127.0.0.1:8081", "http://192.168.2.102:8081","http://localhost:8081","http://localhost:8080","https://zangjames.herokuapp.com/"]
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// app.use(function(req, res, next) {  
//   res.header('Access-Control-Allow-Origin', "*");
//   // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });  

const db = require("./app/models");
db.mongoose
  .connect(db.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
//get static file
app.get("/", (req, res) => {
  res.sendFile(path+"index.html");
});
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to bezkoder application." });
// });

require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
// const HOST = 'localhost';
const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`Server is running on port ${PORT}.`);
});
