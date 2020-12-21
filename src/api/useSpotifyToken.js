import { useCallback } from 'react';
import { useQuery } from 'react-query';

import queryClient from './queryClient';

async function getSpotifyToken() {
    const response = await fetch('/api/token', {
        credentials: 'include',
    });
    const { token } = await response.json();
    return token;
}

function useGetSpotifyToken() {
    return useQuery('spotifyToken', getSpotifyToken, {
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000,
        cacheTime: 60 * 1000,
    });
}

export default function useSpotifyToken() {
    const { data: token, refetch } = useGetSpotifyToken();

    // It's important that this callback is static because it gets passed into the spotify
    // player on init.
    const getOAuthToken = useCallback(async (cb) => {
        const existingToken = queryClient.getQueryData('spotifyToken');
        if (existingToken) {
            console.log(`Using cached token ${existingToken}`);
            cb(existingToken);
            return;
        }
        console.log(`Refetching stale token`);
        const newToken = await refetch();
        cb(newToken);
    }, []);

    return { token, getOAuthToken, refetch };
}
