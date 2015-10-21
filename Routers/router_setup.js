module.exports = function (app) {
	var module = { };

	// Module Function : createRoutes()
	// Makes our Express app use all the routes needed for our program.

	module.createRoutes = function() {

		// Create Authentication Routes

		var router_auth   = require('express').Router();
		var routes_auth   = require("./routes_auth")(app);
		var authenticator = require("../Controllers/authenticator")

		// Attach all routes to the Express app

		app.use("/api", buildRoutes(routes_auth.routes, router_auth));

	}

	// Module Inner Function : buildRoutes()
	// Helps the createRoutes function by looping through an array of routes and creating them.

	function buildRoutes(routes, router) {

		routes.forEach(function(route) {
			     if ( route.type === "POST" ) router.post (route.location, route.middleware, route.action);
			else if ( route.type === "GET"  ) router.get  (route.location, route.middleware, route.action);
		});

		return router;
	}

	return module;
}