exports.createRoutes = function(app) {

	// Create Authentication Routes
	var router_auth   = require('express').Router();
	var routes_auth   = require("./routes_auth");
	var authenticator = require("../Controllers/authenticator")

	router_auth.get  ("/test", [authenticator.checkAuth], routes_auth.test);
	router_auth.post (routes_auth.authenticate_loc, routes_auth.authenticate_action)

	// Attach all routes to the Express app

	app.use("/api", router_auth)
}