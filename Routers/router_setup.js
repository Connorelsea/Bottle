exports.createRoutes = function(app) {

	// Create Authentication Routes
	var router_auth   = require('express').Router();
	var routes_auth   = require("./routes_auth");
	var authenticator = require("../Controllers/authenticator")

	// Attach all routes to the Express app

	app.use("/api", buildRoutes(routes_auth.routes, router_auth));

}

var buildRoutes = function buildRoutes(routes, router) {

	routes.forEach(function(route) {
		     if ( route.type === "POST" ) router.post (route.location, route.middleware, route.action);
		else if ( route.type === "GET"  ) router.get  (route.location, route.middleware, route.action);
	});

	return router;
}