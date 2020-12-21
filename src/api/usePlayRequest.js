import { useMutation } from 'react-query';

function postPlayRequest(token, device_id, options = undefined) {
    let url = 'https://api.spotify.com/v1/me/player/play';
    if (device_id) {
        url += `?device_id=${encodeURIComponent(device_id)}`;
    }
    return fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: options,
    });
}

export default useMutation(postPlayRequest);
