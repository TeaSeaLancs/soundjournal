// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import nc from "next-connect";

import sessionMiddleware from "../../util/sessionMiddleware";
import getActiveSpotifyToken from "../../util/getActiveSpotifyToken";

async function getToken(req) {
    const spotify = req.session?.spotify;
    if (!spotify) {
        return null;
    }

    return await getActiveSpotifyToken(spotify);
}

export default nc()
    .use(sessionMiddleware)
    .get(async (req, res) => {
        const token = await getToken(req);
        res.json({ token });
    });
