import { configureStore } from "@reduxjs/toolkit";
import imagesList from "./reducers/imagesList";
import topics from "./reducers/topics";
import wishList from "./reducers/wishList";

export const store = configureStore({
  reducer: { imagesList, topics, wishList },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
