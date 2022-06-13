import { configureStore } from "@reduxjs/toolkit";
import counter from "./reducers/counter";
import imagesList from "./reducers/imagesList";

export const store = configureStore({
  reducer: { counter, imagesList },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
