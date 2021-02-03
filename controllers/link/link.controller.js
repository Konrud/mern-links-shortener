const config = require("config");
const LinkService = require("../../services/link/link.service");

async function getAllLinks(req, res, next) {
    try {
        const userToken = req.userToken;
        const allLinks = await LinkService.getAllLinks(userToken.userID);
        if (allLinks) {
            res.json({ links: allLinks });
        }
    } catch (e) {
        res.status(500).json({ message: `SERVER ERROR: from link.controller.getAllLinks -> ${e.message}` });
    }
};

async function generateLink(req, res, next) {
    try {
        const baseURL = config.get("BASE_URL");
        const { from } = req.body;

        const generatedLink = await LinkService.generateLink({ link: from, baseURL, owner: req.userToken.userID });

        if (!generatedLink) {
            return res.status(415).json({ message: `value is unrecognizable: ${from}` });
        }

        res.status(201).json({ link: generatedLink });
    } catch (e) {
        res.status(500).json({ message: `SERVER ERROR: from link.controller.generateLink -> ${e.message}` });
    }
}

async function getLinkByID(req, res, next) {
    try {
        const linkID = req.params.id;
        const link = await LinkService.getLinkByID(linkID);
        debugger;
        res.status(201).json(link);
    } catch (e) {
        res.status(500).json({ message: `SERVER ERROR: from link.controller.getLinkByID -> ${e.message}` });
    }
}

async function redirectCodedURL(req, res, next) {
    try {
        const linkCode = req.params.codedUrl;
        const link = await LinkService.getLinkByCode(linkCode);

        if (!link) {
            return res.status(404).json({ message: "Link is not found" });
        }

        await LinkService.increaseLinkClicks(link);

        res.redirect(link.from);

    } catch (e) {
        res.status(500).json({ message: `SERVER ERROR: from link.controller.redirectCodedURL -> ${e.message}` });
    }
}

module.exports = { getAllLinks, generateLink, getLinkByID, redirectCodedURL };
