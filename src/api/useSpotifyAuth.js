import { useCallback, useRef, useEffect } from 'react';
import { v4 } from 'uuid';

export default function useSpotifyAuth(onLogin) {
    const authState = useRef(null);
    const loggingIn = useRef(false);
    const loginWindow = useRef(null);

    // Effect: Listen for window messages indicating auth completed
    useEffect(() => {
        function onMessage(event) {
            if (event.origin !== location.origin || !authState.current) {
                return;
            }

            try {
                const { action, state } = event.data;
                if (action === 'logged-in') {
                    if (state !== authState.current) {
                        console.error(
                            `Got logged in event but client state did not match, ${state} vs ${authState.current}`,
                        );
                        return;
                    }

                    loginWindow.current.close();

                    authState.current = null;
                    loggingIn.current = false;
                    loginWindow.current = null;

                    if ('function' === typeof onLogin) {
                        onLogin();
                    }
                }
            } catch (err) {
                console.error(`Error while parsing window message`, err);
            }
        }

        window.addEventListener('message', onMessage);
        return () => {
            window.removeEventListener('message', onMessage);
        };
    }, []);

    return useCallback(() => {
        if (loggingIn.current) {
            return;
        }

        loggingIn.current = true;
        authState.current = v4();

        loginWindow.current = window.open(
            `/api/auth/login?state=${encodeURIComponent(authState.current)}`,
            'Login',
            'menubar=no,location=no,resizable=yes,scrollbars=yes,status=yes,width=480,height=640',
        );
    }, []);
}
