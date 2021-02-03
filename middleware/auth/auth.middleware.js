const jwt = require("jsonwebtoken");
const config = require("config");

function getTokenMiddleware(req, res, next) {
    if (req.method === "OPTIONS") { return next(); } // we don't care about `OPTIONS` request

    try {
        const token = _parseTokenFromHeader(req.headers.authorization); // `BEARER token`

        if (!token) {
            return res.status(401).json({ message: "unauthorized user" });
        }

        // parse token
        const decodedToken = jwt.verify(token, config.get("JWT_SECRET_KEY"));

        // set `decodedToken` to the request object as `userToken` property for the subsequent routes to use
        req.userToken = decodedToken;
        next(); // pass control to the next middleware/route
    }
    catch (error) {
        if (error.message === "jwt expired") {
            return res.status(401).json({ message: "unathorized user", tokenExpired: true });
        }
        res.status(401).json({ message: "unathorized user" });
    }
}

function _parseTokenFromHeader(headerValue) {
    const headerValues = headerValue.split(/\s+/);
    if (headerValues) {
        return headerValues[1];
    }
}


module.exports = { getTokenMiddleware };