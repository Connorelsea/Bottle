module.exports = function (app) {
	var module = { };

	var authenticator = require("../Controllers/authenticator")(app);

	module.test = function(req, res) {

		res.json({
			message : "Success!"
		})

	}

	// Route Holder Array
	// Holds the routes relevant to authorization and authentication.

	module.routes = [
		{
			name       : "Test",
			type       : "GET",
			location   : "/test",
			middleware : [authenticator.checkAuth],
			action     : function(req, res) { res.json({ success : "true" }); }
		},
		{
			name       : "Authenticate",
			type       : "POST",
			location   : "/authenticate",
			middleware : [],
			action     : function(req, res) { authenticator.auth(req, res); }
		}
	]

	return module;
}