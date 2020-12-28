const SpotifyWebApi = require("spotify-web-api-node");

const { SPOTIFY_CLIENT_ID, SPOTIFY_SECRET } = process.env;

function getAuthApi() {
    return new SpotifyWebApi({
        clientId: SPOTIFY_CLIENT_ID,
        clientSecret: SPOTIFY_SECRET,
        redirectUri: "http://localhost:3000/api/auth/callback",
    });
}

function getUserApi({ accessToken, refreshToken }) {
    return new SpotifyWebApi({ accessToken, refreshToken });
}

module.exports = { getAuthApi, getUserApi };
