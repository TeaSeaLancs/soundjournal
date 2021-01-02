import dynamic from "next/dynamic";

function passthrough({ component: Component = "div", children }) {
    return <Component>{children || null}</Component>;
}

export const TrackSwitcher = dynamic(
    () => import("./AllComponents").then((mod) => mod.TrackSwitcher),
    { ssr: false, loading: passthrough }
);

export const TrackArea = dynamic(() => import("./AllComponents").then((mod) => mod.TrackArea), {
    ssr: false,
    loading: passthrough,
});
