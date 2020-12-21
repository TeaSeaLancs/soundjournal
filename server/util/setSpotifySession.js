module.exports = function setSpotifySession(req, body) {
    const { access_token: accessToken, refresh_token: refreshToken, expires_in: expiresIn } = body;

    const expiryTime = new Date(Date.now() + expiresIn * 1000).getTime();

    const store = {
        accessToken,
        refreshToken,
        expiryTime,
    };

    req.session.spotify = store;
    return store;
};
