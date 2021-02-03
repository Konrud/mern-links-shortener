const Link = require("../../models/link/link.model");
const shortid = require("shortid");

async function getAllLinks(userID) {
    try {
        const links = await Link.find({ owner: userID });
        return links;
    } catch (error) {
        console.error(`From link.service.js -> getAllLinks -> error info: ${error}`);
    }
};

async function generateLink({ link, baseURL, owner }) {
    try {
        const existingLink = await _getExistingLink(link);
        // link already existing in the DB
        if (existingLink) {
            return existingLink;
        }

        const shortIdCode = shortid.generate();

        const shortendLink = baseURL + "/t/" + shortIdCode;

        const newLink = await _createNewLink({ code: shortIdCode, to: shortendLink, from: link, owner })

        return newLink;
    } catch (error) {
        console.error(`From link.service.js -> generateLink -> error info: ${error}`);
    }
}

async function getLinkByID(linkID) {
    try {
        const link = await Link.findById(linkID);
        return link;
    } catch (error) {
        console.error(`From link.service.js -> getLinkByID -> error info: ${error}`);
    }
}

async function getLinkByCode(linkCode) {
    try {
        const link = await Link.findOne({ code: linkCode });
        debugger;
        return link;
    } catch (error) {
        console.error(`From link.service.js -> getLinkByCode -> error info: ${error}`);
    }
}

async function increaseLinkClicks(link) {
    try {
        link.clicks += 1;
        await link.save(); // save in DB
        return link;
    } catch (error) {
        console.error(`From link.service.js -> increaseLinkClicks -> error info: ${error}`);
    }
}


// UTILS
async function _createNewLink({ code, to, from, owner }) {
    try {
        const newLink = new Link({ code, to, from, owner });
        await newLink.save();
        return newLink;
    } catch (error) {
        console.error(`From link.service.js -> _createNewLink -> error info: ${error}`);
    }
}

async function _getExistingLink(link) {
    return await Link.findOne({ from: link });
}

module.exports = { getAllLinks, generateLink, getLinkByID, getLinkByCode, increaseLinkClicks };