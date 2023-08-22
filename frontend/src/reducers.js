import { combineReducers } from "redux";
import identityReducer from "@/containers/Identity/reducer";
import customerReducer from "@/containers/Customers/reducer";

const rootReducer = combineReducers({
    identity: identityReducer,
    customer: customerReducer
});

export default rootReducer;