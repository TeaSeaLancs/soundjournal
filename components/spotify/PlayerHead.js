import useSpotifyReady from "./hooks/useSpotifyReady";

export default function PlayerHead() {
    useSpotifyReady();
    return <script src="https://sdk.scdn.co/spotify-player.js"></script>;
}
