import { combineReducers } from "redux";
import identityReducer from "@/containers/Identity/reducer";

const rootReducer = combineReducers({
    identity: identityReducer,
});

export default rootReducer;