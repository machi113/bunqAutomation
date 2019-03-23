import React from "react";
import { useMappedState } from "redux-react-hook";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import MuiTheme from "./Config/MuiTheme";

import Routes from "./Routes";
import Snackbar from "./Components/Snackbar";
import useTheme from "./Redux/Actions/useTheme";

const lightTheme = createMuiTheme(MuiTheme.light);
const darkTheme = createMuiTheme(MuiTheme.dark);

const mapState = state => ({
    darkMode: state.theme.darkMode
});

const Content = () => {
    const { darkMode } = useMappedState(mapState);
    const { toggleTheme } = useTheme();
    window.toggleTheme = toggleTheme;

    return (
        <MuiThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <div className={`app ${darkMode ? "dark" : "light"}`}>
                <Routes />

                <Snackbar />
            </div>
        </MuiThemeProvider>
    );
};

export default Content;
