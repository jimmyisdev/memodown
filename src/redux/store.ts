import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/apiSlice";
import { useDispatch } from "react-redux";

export const store =
    configureStore({
        reducer: {
            [apiSlice.reducerPath]: apiSlice.reducer
        },
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat(apiSlice.middleware)
        ,
        devTools: true,
    });

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector



