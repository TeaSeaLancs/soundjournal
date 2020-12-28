import Head from "next/head";
import { Provider } from "react-redux";

import SpotifyPlayerHead from "../components/spotify/PlayerHead";
import SpotifyPlayer from "../components/player";

import TestButton from "../components/player/TestPlayButton";

import createState from "../state";

const store = createState();

export default function Main() {
    return (
        <Provider store={store}>
            <div>
                <Head>
                    <title>Spotify Stories</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <SpotifyPlayerHead />
                <SpotifyPlayer />
                <TestButton />
            </div>
        </Provider>
    );
}
