import { useEffect } from "react";

import SwitcherContext from "./SwitcherContext";

import useSwitcherControl from "./hooks/useSwitcherControl";
import useTrackSwitcher from "./hooks/useTrackSwitcher";

export default function TrackSwitcher({ component: Component = "div", children }) {
    const { control, currentTrack } = useSwitcherControl();
    useTrackSwitcher(currentTrack);

    return (
        <SwitcherContext.Provider value={control}>
            <Component>{children}</Component>
        </SwitcherContext.Provider>
    );
}
