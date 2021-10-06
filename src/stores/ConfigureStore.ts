import { configureStore } from "@reduxjs/toolkit";
import AddressSlicer from "./map/AddressSlicer";

export const store = configureStore({
    reducer: {
        address: AddressSlicer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["address/setDestinationGeoLocation/fulfilled", "address/setStartGeoLocation/fulfilled"]
            }
        })
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
