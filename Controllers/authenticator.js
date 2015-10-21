module.exports = function (app) {
	var module = { };

	var jwt = require("jsonwebtoken");

	module.auth = function(req, res) {

		if (req.body.username && req.body.password) {

			var user = {
				name    : req.body.name,
				message : "This test-token was generated on the server side."
			}

			var token = jwt.sign(user, app.get("JWT_SECRET"))

			res.json({
				token : token
			})

		} else {

			// Determine the reason for failure and set the upcoming error message
			// to that reason.

			if (!req.body.username && !req.body.password) var message = "No username or password supplied.";
			else if (!req.body.username) var message = "No username supplied.";
			else if (!req.body.password) var message = "No password supplied.";

			// Return a JSON object to the user indicating the reason for failure.

			res.json({
				success : "false",
				message : message
			})
		}

	}

	module.checkAuth = function(req, res) {

		var token = req.headers['x-access-token'];

		if (token) {

			// Attempts to decode and verify the token.

			jwt.verify(token, app.get("JWT_SECRET"), function(err, token_decoded) {

				if (err) {

					// If the token fails the verification process, do not move on
					// to other routes and then return a JSON error message.

					return res.json({
						success : false,
						message : "Failed to authenticate provided token."
					})

				} else {

					// If token is verified, save information to the request object
					// for use in other routes.

					req.token         = token_decoded;
					req.user          = token_decoded.user;
					req.authenticated = true;

					next();
				}

			})

		} else {

			// If the token is not found on the x-access-token header, do not move on
			// to other routes and then return a JSON error message.

			return res.json({
				success : false,
				message : "Token not found and/or not attached to x-access-token header."
			})

		}

	}

	return module;
}