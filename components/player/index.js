import dynamic from "next/dynamic";

export default dynamic(() => import("./SpotifyMain"), { ssr: false });
