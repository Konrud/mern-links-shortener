const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

function getRegistrationValidationRules() {
    return [
        check("email", "invalid email").normalizeEmail().isEmail(),
        check("password", "password should be at least 6 charaters long").exists().isLength({ min: 6 })
    ];
}

function getLoginValidationRules() {
    return [
        check("email", "invalid email").normalizeEmail().isEmail(),
        check("password", "password is incorrect").exists().isLength({ min: 6 })
    ];
}

function validateResults(req) {
    const errors = validationResult(req);
    return { errors: errors && errors.array(), hasErrors: !errors.isEmpty() };
}

function createJWTokenForUser(user, secretKey, signInOptions = { expiresIn: "1h" }) {
    return jwt.sign(
        { userID: user.id },
        secretKey,
        signInOptions
    );
}

module.exports = { getRegistrationValidationRules, getLoginValidationRules, validateResults, createJWTokenForUser };