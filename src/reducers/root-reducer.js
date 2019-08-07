import { combineReducers } from "redux";
import signIn from "./sign-in";
import apps from "./apps";
import users from "./users";

export default combineReducers({ signIn, apps, users });
