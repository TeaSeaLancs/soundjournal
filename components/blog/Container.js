import { forwardRef } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useClasses = makeStyles((theme) => ({
    root: {
        width: "auto",
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(1100 + theme.spacing(6))]: {
            width: 1100,
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
    main: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

export default forwardRef(function BlogContainer({ children }, ref) {
    const classes = useClasses();

    return (
        <div ref={ref} className={classes.root}>
            <main className={classes.main}>{children}</main>
        </div>
    );
});
