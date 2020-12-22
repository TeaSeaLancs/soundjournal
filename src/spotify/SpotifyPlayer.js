import { useMemo } from 'react';
import PropTypes from 'prop-types';
import useSpotifyPlayer from './hooks/useSpotifyPlayer';
import PlayerContext from './PlayerContext';

export default function SpotifyPlayer({ getOAuthToken, onNewDeviceId, children }) {
    const [player, error] = useSpotifyPlayer({ getOAuthToken }, { onNewDeviceId });

    const context = useMemo(() => ({ player, error }), [player, error]);
    return <PlayerContext.Provider value={context}>{children}</PlayerContext.Provider>;
}

SpotifyPlayer.propTypes = {
    getOAuthToken: PropTypes.func,
    onNewDeviceId: PropTypes.func,
    children: PropTypes.node,
};
