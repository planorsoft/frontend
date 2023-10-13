import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit'

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import logger from "redux-logger";
import thunk from "redux-thunk";

import { identityReducer } from "@/containers/Identity/reducer";
import { dutyReducer } from "@/containers/Duty/reducer";

const rootReducer = combineReducers({
    identity: identityReducer,
    dutyState: dutyReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk).concat(logger),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;