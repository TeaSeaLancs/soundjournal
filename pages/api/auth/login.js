import nc from "next-connect";

import { getAuthApi } from "../../../util/spotify";
import sessionMiddleware from "../../../util/sessionMiddleware";
import AuthJwt from "../../../util/jwt";

const scopes = [
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "streaming",
    "user-read-email",
    "user-read-private",
    "app-remote-control",
    "user-read-playback-position",
];

const spotifyApi = getAuthApi();

export default nc()
    .use(sessionMiddleware)
    .get((req, res) => {
        const { state } = req.query;
        if (!state) {
            throw new Error(`No client state supplied`);
        }

        const token = AuthJwt.sign({ state });
        res.redirect(spotifyApi.createAuthorizeURL(scopes, token));
    });
