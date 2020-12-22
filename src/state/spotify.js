import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    deviceId: null,
};

const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setToken(state, { payload: token }) {
            state.token = token;
        },
        setDeviceId(state, { payload: deviceId }) {
            state.deviceId = deviceId;
        },
    },
});

export const { setToken, setDeviceId } = tokenSlice.actions;
export default tokenSlice.reducer;
