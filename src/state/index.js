import { configureStore } from '@reduxjs/toolkit';

import spotify from './spotify';

console.log(spotify);

export default () => {
    return configureStore({
        devTools: process.env.NODE_ENV !== 'production',
        reducer: {
            spotify,
        },
    });
};
