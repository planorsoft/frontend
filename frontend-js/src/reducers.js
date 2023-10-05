import { combineReducers } from "redux";
import identityReducer from "@/containers/Identity/reducer";
import customerReducer from "@/containers/Customers/reducer";
import currencyReducer from "@/containers/Settings/Currency/reducer";

const rootReducer = combineReducers({
    identity: identityReducer,
    customer: customerReducer,
    currency: currencyReducer,
});

export default rootReducer;