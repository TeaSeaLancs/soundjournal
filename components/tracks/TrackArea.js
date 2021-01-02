import { useContext, useRef, useEffect, forwardRef } from "react";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import SwitcherContext from "./SwitcherContext";

const useClasses = makeStyles({
    root: {
        position: "relative",
    },
    page: {
        height: "100vh",
    },
});

const useIndicatorClasses = makeStyles({
    root: {
        position: "absolute",
        pointerEvents: "none",
        height: "100%",
        width: "100%",
    },
    needle: {
        position: "sticky",
        top: "50vh",
        height: "calc(50vh - 2px)",
        borderTop: "1px solid red",
        borderBottom: "1px solid red",
        width: "100%",
        pointerEvents: "none",
        fontSize: "8px",
    },
});

const TrackIndicator = forwardRef(function TrackIndicator({ children }, ref) {
    const classes = useIndicatorClasses();

    return (
        <div className={classes.root}>
            <div className={classes.needle} ref={ref}>
                {children}
            </div>
        </div>
    );
});

export default function TrackArea({
    component: Component = "div",
    uri,
    position,
    page = false,
    children,
}) {
    const ref = useRef();
    const switcherControl = useContext(SwitcherContext);

    const classes = useClasses();

    useEffect(() => {
        if (!switcherControl) {
            return;
        }

        const el = ref.current;
        switcherControl.add(el, { uri, position });
        return () => {
            switcherControl.remove(el);
        };
    }, [switcherControl, ref.current]);

    const className = clsx(classes.root, {
        [classes.page]: page,
    });

    return (
        <Component className={className}>
            <TrackIndicator ref={ref} id={uri}>
                {children}
            </TrackIndicator>
            {children}
        </Component>
    );
}
