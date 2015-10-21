var express        = require("express");
var bodyParser     = require("body-parser");
var methodOverride = require("method-override");
var jwt            = require("jsonwebtoken");
var expressjwt     = require("express-jwt");

var app = express();

var secretKeep = "asdasdasd"

app.use(express.static(__dirname + "/public"));
//app.use("/api", expressjwt({secret : secretKeep}))
app.use(bodyParser.urlencoded({ "extended" : "true" }));
app.use(bodyParser.json());
app.use(methodOverride());


app.listen(3000);
console.log("App listening on port 3000");

require("./Routers/router_setup").createRoutes(app);

// app.get("*", function(req, res) {
// 	res.sendFile("./public/index.html");
// })

// app.post("/authenticate", function(req, res) {

// 	if (req.body.username === "connorelsea" && req.body.password === "password") {
// 		res.send(401, "Wrong username or password");
// 	}

// 	var profile = {
// 		name  : "Connor M. Elsea",
// 		email : "connorelsea@student.lsmsa.edu",
// 		id    : 123
// 	}

// 	var token = jwt.sign(profile, secretKeep, { expiresInMinutes : 1 })
// 	res.json({ token : token })
// })

// app.get("/api/restrict", function(req, res) {
// 	res.json({
// 		secret_information : "This information is secret and restricted."
// 	})
// })