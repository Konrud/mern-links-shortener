const { Router } = require("express");
const Link_Controller = require("../../controllers/link/link.controller");
const authMiddleware = require("../../middleware/auth/auth.middleware");

const ROUTER = Router();

ROUTER.get("/", authMiddleware.getTokenMiddleware, Link_Controller.getAllLinks);

ROUTER.post("/generate", authMiddleware.getTokenMiddleware, Link_Controller.generateLink);

ROUTER.get("/:id", authMiddleware.getTokenMiddleware, Link_Controller.getLinkByID);


module.exports = ROUTER;