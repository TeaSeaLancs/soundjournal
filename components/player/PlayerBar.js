import PropTypes from "prop-types";

import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useClasses = makeStyles((theme) => ({
    root: {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        padding: theme.spacing(2),
    },
}));

export default function PlayerBar({ children }) {
    const classes = useClasses();

    return (
        <Paper variant="outlined" classes={classes}>
            {children}
        </Paper>
    );
}

PlayerBar.propTypes = {
    children: PropTypes.node,
};
