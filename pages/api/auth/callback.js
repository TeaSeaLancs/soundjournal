import nc from "next-connect";

import { getAuthApi } from "../../../util/spotify";
import sessionMiddleware from "../../../util/sessionMiddleware";
import AuthJwt from "../../../util/jwt";
import setSpotifySession from "../../../util/setSpotifySession";

const generatePostResponseMessage = (state) => `
    <script type="text/javascript">
        window.opener.postMessage({ action: "logged-in", state: "${state}"}, location.origin)
    </script>
`;

const spotifyApi = getAuthApi();

export default nc()
    .use(sessionMiddleware)
    .get(async (req, res) => {
        const error = req.query.error;
        const code = req.query.code;
        const state = req.query.state;

        if (error) {
            throw new Error(`Auth failed: ${error}`);
        }

        const { state: clientState } = AuthJwt.verify(state);

        const { body } = await spotifyApi.authorizationCodeGrant(code);
        setSpotifySession(req, body);
        res.send(generatePostResponseMessage(clientState));
    });
