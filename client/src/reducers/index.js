import { combineReducers } from "redux";
import auth from "./auth";
import crypto from "./crypto";
import favoriteCrypto from "./favoriteCrypto";

export default combineReducers({ auth, crypto, favoriteCrypto });
