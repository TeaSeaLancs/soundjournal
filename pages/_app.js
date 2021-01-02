import { useEffect } from "react";
import PropTypes from "prop-types";

import CssBaseline from "@material-ui/core/CssBaseline";
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
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline>
                    <Component {...pageProps} />
                </CssBaseline>
            </ThemeProvider>
        </QueryClientProvider>
    );
}

SpotifyStories.propTypes = {
    Component: PropTypes.elementType,
    pageProps: PropTypes.object,
};
