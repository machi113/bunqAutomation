import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { withStyles } from "@material-ui/core/styles";
import { useMappedState } from "redux-react-hook";

import Appbar from "./Appbar";
import MainMenu from "./MainMenu";

import useStoredBoolean from "../../Hooks/useStoredBoolean";

import useUserActions from "../../Redux/Actions/useUserActions";
import useAuthenticationActions from "../../Redux/Actions/useAuthenticationActions";
import ErrorBoundary from "../ErrorBoundary";

const styles = theme => ({
    root: {
        display: "flex"
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: "100vh",
        overflow: "auto"
    },
    h5: {
        marginBottom: theme.spacing.unit * 2
    }
});

const mapState = state => ({
    user: state.user.user,
    userLoading: state.user.loading,

    authenticationLoading: state.authentication.loading,

    serverStatusChecked: state.server_status.checked,
    serverStatus: state.server_status.status
});

const Content = ({ classes, children, title = "bunqAutomation" }) => {
    const [menuOpen, toggleMenu] = useStoredBoolean("main-menu");
    const state = useMappedState(mapState);
    const { logout } = useAuthenticationActions();
    const { getUser } = useUserActions();

    useEffect(() => {
        if (!state.user && !state.userLoading && !state.authenticationLoading) getUser();
    }, []);

    useEffect(() => {
        if (state.serverStatusChecked && state.serverStatus === "STATUS_UNINITIALIZED") logout();
    }, [state.serverStatusChecked, state.serverStatus]);

    return (
        <ErrorBoundary>
            <div className={classes.root}>
                <Helmet title={title} />

                <Appbar title={title} menuOpen={menuOpen} toggleMenu={toggleMenu} />

                <MainMenu logout={logout} open={menuOpen} toggleMenu={toggleMenu} />

                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />

                    <ErrorBoundary>{children}</ErrorBoundary>
                </main>
            </div>
        </ErrorBoundary>
    );
};

export default withStyles(styles)(Content);
