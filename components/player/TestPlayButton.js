import { useCallback } from "react";
import { useSelector } from "react-redux";

import Button from "@material-ui/core/Button";

import usePlayRequest from "../../api/usePlayRequest";

export default function TestPlayButton() {
    const { token, deviceId } = useSelector((state) => state.spotify);
    const playRequest = usePlayRequest();

    const playTestSong = useCallback(() => {
        playRequest.mutate({
            token,
            deviceId,
            options: {
                uris: ["spotify:track:2pxpJ9lmbqPEIk3M7ezLR0"],
                position_ms: 47000,
            },
        });
    }, [token, deviceId]);

    const canPlay = Boolean(token && deviceId);

    return (
        <Button disabled={!canPlay} onClick={playTestSong}>
            Don&apos;t give up
        </Button>
    );
}
