import fs from "fs";
import path from "path";
import { promisify } from "util";

import Head from "next/head";
import { Provider } from "react-redux";

import * as components from "../../components/mdx/components";

import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";

import SpotifyPlayerHead from "../../components/spotify/PlayerHead";
import SpotifyPlayer from "../../components/player";
import { TrackSwitcher } from "../../components/tracks";

import createState from "../../state";
import BlogContainer from "../../components/blog/Container";

const store = createState();

const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);

export async function getServerSideProps(context) {
    const {
        params: { id },
    } = context;

    const fixturesDir = path.join(process.cwd(), "fixtures");
    const page = path.join(fixturesDir, `${id}.mdx`);

    try {
        await stat(page);
        const source = await readFile(page, { encoding: "utf-8" });
        const story = await renderToString(source, { components });
        return {
            props: {
                story,
            },
        };
    } catch (err) {
        console.error(`Error loading story ${id}`, err);
        return {
            notFound: true,
        };
    }
}

export default function SpotifyStoryForId({ story }) {
    const content = hydrate(story, { components });
    return (
        <Provider store={store}>
            <div>
                <Head>
                    <title>Spotify Stories</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <SpotifyPlayerHead />
                <SpotifyPlayer />
                <TrackSwitcher component={BlogContainer}>{content}</TrackSwitcher>
            </div>
        </Provider>
    );
}
