import { useMutation } from 'react-query';

function postPlayRequest({ token, deviceId, options = {} }) {
    let url = 'https://api.spotify.com/v1/me/player/play';
    if (deviceId) {
        url += `?device_id=${encodeURIComponent(deviceId)}`;
    }
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(options),
    });
}

export default () => useMutation(postPlayRequest);
