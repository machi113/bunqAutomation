import { combineReducers } from "redux";

import authentication from "./authentication";
import bunq_api_keys from "./bunq_api_keys";
import server_status from "./server_status";
import snackbar from "./snackbar";
import theme from "./theme";
import user from "./user";

export default combineReducers({
    authentication,
    bunq_api_keys,
    server_status,
    snackbar,
    theme,
    user
});
