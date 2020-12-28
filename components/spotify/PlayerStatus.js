import { useContext, useState, useEffect } from 'react';
import PlayerContext from './PlayerContext';
import usePlayerEvent from './hooks/usePlayerEvent';

import Typography from '@material-ui/core/Typography';

export default function PlayerStatus() {
    const [playerState, setPlayerState] = useState(null);

    const { player, error } = useContext(PlayerContext);

    // Effect: If we don't have a player state, then init it when we get a new player
    useEffect(() => {
        if (player) {
            (async () => {
                setPlayerState(await player.getCurrentState());
            })();
        }
    }, [player]);

    usePlayerEvent('player_state_changed', setPlayerState);

    if (error) {
        const { type, message } = error;
        return (
            <Typography>
                {type} error while using Spotify Web Player: {message}
            </Typography>
        );
    }

    if (!playerState) {
        return <Typography>Not using Spotify atm</Typography>;
    }

    return <Typography>Listening to Spotify</Typography>;
}
