import { useEffect, useContext } from 'react';

import PlayerContext from '../PlayerContext';

export default function usePlayerEvent(event, cb) {
    const { player } = useContext(PlayerContext);

    useEffect(() => {
        if (!player) {
            return undefined;
        }

        player.addListener(event, cb);
        return () => {
            player.removeListener(event, cb);
        };
    }, [player, event, cb]);
}
