var authenticator = require("../Controllers/authenticator");

exports.test = function(req, res) {

	res.json({
		message : "Success!"
	})

}

// Route: Authenticate

exports.routes = [
	{
		name       : "Test",
		location   : "/test",
		middleware : [authenticator.checkAuth],
		action     : function(req, res) { res.json({ success : "true" }) }
	},
	{
		name       : "Authenticate",
		location   : "/authenticate",
		middleware : [],
		action     : function(req, res) { authenticator.auth(req, res); }
	}
]