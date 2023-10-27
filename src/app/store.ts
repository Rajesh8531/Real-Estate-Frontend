import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "../features/auth";
import ListingReducer from '../features/listing'

const store = configureStore({
    reducer : {
        auth : AuthReducer,
        listing : ListingReducer
    },
})

export type RootState = ReturnType<typeof store.getState >
export type AppDispatch = typeof store.dispatch

export default store