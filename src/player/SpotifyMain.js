import { Suspense } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import SpotifyPlayer from '../spotify/SpotifyPlayer';
import PlayerStatus from '../spotify/PlayerStatus';

import useSpotifyToken from '../api/useSpotifyToken';
import useSpotifyAuth from '../api/useSpotifyAuth';
import PlayerBar from './PlayerBar';

function LoginHandler({ onClick }) {
    return (
        <Button variant="contained" color="primary" onClick={onClick}>
            Login to Spotify
        </Button>
    );
}

LoginHandler.propTypes = {
    onClick: PropTypes.func,
};

function SpotifyAuthRouter() {
    const { token, getOAuthToken, refetch } = useSpotifyToken();
    const startAuth = useSpotifyAuth(refetch);

    const loggedIn = Boolean(token);

    if (!loggedIn) {
        return <LoginHandler onClick={startAuth} />;
    }

    return (
        <SpotifyPlayer getOAuthToken={getOAuthToken}>
            <PlayerStatus />
        </SpotifyPlayer>
    );
}

export default function SpotifyMain() {
    return (
        <PlayerBar>
            <Suspense fallback={<CircularProgress />}>
                <SpotifyAuthRouter />
            </Suspense>
        </PlayerBar>
    );
}
