import { useState, useRef, useCallback, useLayoutEffect, useMemo } from "react";

export default function useSwitcherControl() {
    const observer = useRef();
    const tracksByElement = useRef();
    const currentActiveElement = useRef();

    const [currentTrack, setCurrentTrack] = useState(null);

    if (!tracksByElement.current) {
        tracksByElement.current = new WeakMap();
    }

    const onObserve = useCallback((entries) => {
        entries.forEach((entry) => {
            if (entry.target === currentActiveElement.current && !entry.isIntersecting) {
                currentActiveElement.current = null;
                setCurrentTrack(null);
            }

            if (entry.isIntersecting) {
                currentActiveElement.current = entry.target;
                setCurrentTrack(tracksByElement.current.get(entry.target));
            }
        });
    }, []);

    // Layout effect as we need this to fire before any callbacks, create an intersection observer
    useLayoutEffect(() => {
        observer.current = new IntersectionObserver(onObserve, {
            threshold: [1],
        });

        return () => {
            observer.current.disconnect();
            observer.current = null;
        };
    }, []);

    const add = useCallback((el, track) => {
        observer.current?.observe(el);
        tracksByElement.current.set(el, track);
    }, []);

    const remove = useCallback((el) => {
        observer.current?.unobserve(el);
    }, []);

    const control = useMemo(
        () => ({
            add,
            remove,
        }),
        []
    );

    return {
        currentTrack,
        control,
    };
}
