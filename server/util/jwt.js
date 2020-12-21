const jwt = require('jsonwebtoken');

const { STATE_SIGN_SECRET } = process.env;

const ISSUER = 'spotify-stories';

function sign(payload) {
    return jwt.sign(payload, STATE_SIGN_SECRET, {
        expiresIn: '30m',
        issuer: ISSUER,
    });
}

function verify(token) {
    return jwt.verify(token, STATE_SIGN_SECRET, {
        issuer: ISSUER,
    });
}

module.exports = { sign, verify };
