import PropTypes from "prop-types";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { QueryClientProvider } from "react-query";

import green from "@material-ui/core/colors/green";
import purple from "@material-ui/core/colors/purple";

import queryClient from "../api/queryClient";

const theme = createMuiTheme({
    palette: {
        primary: green,
        secondary: purple,
    },
});

export default function SpotifyStories({ Component, pageProps }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </QueryClientProvider>
    );
}

SpotifyStories.propTypes = {
    Component: PropTypes.elementType,
    pageProps: PropTypes.object,
};
