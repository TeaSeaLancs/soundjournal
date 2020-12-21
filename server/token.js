const { Router } = require('express');

const getActiveSpotifyToken = require('./util/getActiveSpotifyToken');

module.exports = (app) => {
    const auth = Router({ mergeParams: true });

    async function getToken(req) {
        const spotify = req.session?.spotify;
        if (!spotify) {
            return null;
        }

        return await getActiveSpotifyToken(spotify);
    }

    auth.get('/', async (req, res) => {
        const token = await getToken(req);
        res.json({ token });
    });

    app.use('/token', auth);
};
