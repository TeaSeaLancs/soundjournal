const { Router } = require('express');

const { getAuthApi } = require('./util/spotify');
const setSpotifySession = require('./util/setSpotifySession');
const AuthJwt = require('./util/jwt');

const scopes = [
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'user-read-email',
    'user-read-private',
    'app-remote-control',
    'user-read-playback-position',
];

const generatePostResponseMessage = (state) => `
    <script type="text/javascript">
        window.opener.postMessage({ action: "logged-in", state: "${state}"}, location.origin)
    </script>
`;

module.exports = (app) => {
    const auth = Router({ mergeParams: true });

    const spotifyApi = getAuthApi();

    auth.get('/login', (req, res) => {
        const { state } = req.query;
        if (!state) {
            throw new Error(`No client state supplied`);
        }

        const token = AuthJwt.sign({ state });
        res.redirect(spotifyApi.createAuthorizeURL(scopes, token));
    });

    auth.get('/callback', async (req, res) => {
        const error = req.query.error;
        const code = req.query.code;
        const state = req.query.state;

        if (error) {
            throw new Error(`Auth failed: ${error}`);
        }

        const { state: clientState } = AuthJwt.verify(state);

        const { body } = await spotifyApi.authorizationCodeGrant(code);
        setSpotifySession(req, body);
        console.log(`Got spotify credentials`, body);
        res.send(generatePostResponseMessage(clientState));
    });

    app.use('/auth', auth);
};
