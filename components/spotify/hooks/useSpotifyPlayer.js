import { useRef, useEffect, useState } from "react";

import useSpotifyReady from "./useSpotifyReady";

export default function useSpotifyPlayer({ name = "Spotify stories", getOAuthToken } = {}, events) {
    const playerRef = useRef();
    const spotifyReady = useSpotifyReady();

    const [error, setError] = useState(null);

    useEffect(() => {
        if (!spotifyReady) {
            return;
        }

        const player = new Spotify.Player({
            name,
            getOAuthToken,
        });

        playerRef.current = player;
        window.player = playerRef;

        const setErrorMessageWithType = (type) => ({ message }) => setError({ type, message });

        player.addListener("initialization_error", setErrorMessageWithType("init"));
        player.addListener("authentication_error", setErrorMessageWithType("auth"));
        player.addListener("account_error", setErrorMessageWithType("account"));
        player.addListener("playback_error", setErrorMessageWithType("playback"));

        player.addListener("ready", ({ device_id }) => {
            console.log("Ready with Device ID", device_id);
            if (events?.onNewDeviceId) {
                events.onNewDeviceId(device_id);
            }
        });

        // Not Ready
        player.addListener("not_ready", ({ device_id }) => {
            console.log("Device ID has gone offline", device_id);
        });

        console.log(`Connecting to player`);
        player.connect();

        return () => {
            console.log(`Disconnecting from player`);
            player.disconnect();
        };
    }, [spotifyReady]);

    return [playerRef.current, error];
}
