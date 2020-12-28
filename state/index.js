import { configureStore } from "@reduxjs/toolkit";

import spotify from "./spotify";

export default function createState() {
    return configureStore({
        devTools: process.env.NODE_ENV !== "production",
        reducer: {
            spotify,
        },
    });
}
