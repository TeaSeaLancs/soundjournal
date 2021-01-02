import { useEffect } from "react";
import { useSelector } from "react-redux";

import usePlayRequest from "../../../api/usePlayRequest";

export default function useTrackSwitcher(currentTrack) {
    const { token, deviceId } = useSelector((state) => state.spotify);
    const playRequest = usePlayRequest();

    useEffect(() => {
        if (!currentTrack || !token || !deviceId) {
            return;
        }

        const options = {
            uris: [currentTrack.uri],
            position_ms: currentTrack.position ?? 0,
        };

        playRequest.mutate({
            token,
            deviceId,
            options,
        });
    }, [currentTrack, token, deviceId]);
}
