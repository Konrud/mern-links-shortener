const UserService = require("../../services/user/user.service");
const { getRegistrationValidationRules, getLoginValidationRules, validateResults, createJWTokenForUser } = require("./auth.utils");
const config = require("config");

async function register(req, res, next) {
    debugger;
    console.log("auth.controller.register");
    try {
        // validate input data
        const { hasErrors, errors } = validateResults(req);

        if (hasErrors) {
            return res.status(400).json({ message: "There were errors during validation process", errors });
        }

        const { email, password } = req.body;

        const registeredUser = await UserService.getUserByEmail(email);

        // user with this email is already registered
        if (registeredUser) {
            return res.status(400).json({ message: `User with an email: ${email} is already registered` });
        }

        // register new user
        await UserService.createNewUser({ email, password });
        // status 201 - Created success, indicates that the request has succeeded and has led to the creation of a resource.
        res.status(201).json({ message: `New user has been successfully created` });
    } catch (error) {
        res.status(500).json({ message: `SERVER ERROR: from auth.controller.register -> ${error.message}` });
    }
}

async function login(req, res, next) {
    debugger;
    console.log("auth.controller.login");
    try {
        // validate input data
        const { hasErrors, errors } = validateResults(req);

        if (hasErrors) {
            return res.status(400).json({ message: "There were errors during validation process", errors });
        }

        const { email, password } = req.body;

        const loggedUser = await UserService.getUserByEmail(email);

        if (!loggedUser) {
            return res.status(400).json({ message: "One of the provided parameters is invalid" });
        }

        const isPasswordValid = await UserService.checkPasswordsEquality(password, loggedUser.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "One of the provided parameters is invalid" });
        }

        // Get token for the logged in user
        const token = createJWTokenForUser(loggedUser, config.get("JWT_SECRET_KEY"));
        // if not set, status is 200 by default
        res.json({ token, userID: loggedUser.id });

    } catch (error) {
        res.status(500).json({ message: `SERVER ERROR: from auth.controller.login -> ${error.message}` });
    }
}


module.exports = { register, login, getRegistrationValidationRules, getLoginValidationRules };