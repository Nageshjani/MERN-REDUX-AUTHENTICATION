import { combineReducers } from "redux";
import token from './tokenReducer'
import users from './usersReducer'

import auth from "./authReducer";
export default combineReducers({
    auth,
    token,
    users
})