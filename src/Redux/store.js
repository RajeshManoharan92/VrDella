import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userslice"

// Redux store

export default configureStore({
    reducer: {
        user: userReducer,
    }
})