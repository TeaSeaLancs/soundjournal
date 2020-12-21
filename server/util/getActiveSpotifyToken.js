const { getUserApi } = require('./spotify');
const setSpotifySession = require('./setSpotifySession');

module.exports = async function getActiveSpotifyToken(spotify) {
    const { accessToken, expiryTime } = spotify;
    if (expiryTime > Date.now()) {
        return accessToken;
    }

    console.log(`Access token expired, requesting new acess token`);
    const userApi = getUserApi(spotify);
    const { body } = await userApi.refreshAccessToken();
    const { accessToken: newAccessToken } = setSpotifySession(body);
    return newAccessToken;
};
