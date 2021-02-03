const express = require("express");
const path = require("path");
const db = require("./db/db");
const ROUTES = require("./routes");
const config = require("config");


const APP = express();
const PORT = config.get("port") || 5050;
const DB_URL = config.get("DB_URL");

APP.disable('x-powered-by'); // turn off x-powered-by:express header

// documentation: http://expressjs.com/en/resources/middleware/body-parser.html
// https://www.robinwieruch.de/node-express-server-rest-api#application-level-express-middleware
APP.use(express.json()); // parse json at the POST request in order to be able to get `req.body` (NOTE: request content type must be "application/json")
// for data send by the <form>
APP.use(express.urlencoded({ extended: true }));

console.log("Hello server!!!");

// ROUTES HANDLING ===============================================

// AUTH ****************************
APP.use("/api/auth/", ROUTES.auth);

// LINK ****************************
APP.use("/api/link", ROUTES.link);

// REDIRECT LINKS ****************************
APP.use("/t", ROUTES.redirect);

// STATIC ===============================================================
if (process.env.NODE_ENV === "production") {
    APP.use("/", express.static(path.join(__dirname, "client", "build")));

    APP.get("*", function (req, res) {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}
// =================================================


// CONNECT TO DB =================================================
const DB_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};
// we start server only after DB is connected
db.connect(DB_URL, DB_OPTIONS).then(startServer);
// ================================================================

// MAIN SERVER LISTENER ===========================================
function startServer() {
    APP.listen(PORT, serverListener);
}

function serverListener(req, res) {
    console.log(`SERVER APP LISTENING ON PORT: ${PORT}`);
};
// ================================================================