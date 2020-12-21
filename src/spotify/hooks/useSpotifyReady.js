import { useState, useEffect } from 'react';

let ready = false;
const readyHooks = [];

window.onSpotifyWebPlaybackSDKReady = () => {
    ready = true;
    readyHooks.forEach((hook) => hook());
    readyHooks.length = 0;
};

export default function useSpotifyReady() {
    const [isReady, setIsReady] = useState(ready);

    useEffect(() => {
        if (isReady) {
            return;
        }

        const onReady = () => setIsReady(true);
        readyHooks.push(onReady);

        return () => {
            const index = readyHooks.indexOf(onReady);
            if (index > -1) {
                readyHooks.splice(index, 1);
            }
        };
    }, [isReady]);

    return isReady;
}
