const { Router } = require("express");
const LINK_CONTROLLER = require("../../controllers/link/link.controller");

const ROUTER = Router();

ROUTER.get("/:codedUrl", LINK_CONTROLLER.redirectCodedURL)


module.exports = ROUTER;