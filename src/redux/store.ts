import { configureStore, combineReducers } from "@reduxjs/toolkit";
import brandReducer from "./Slice/brandSlice";
import productSlice from "./Slice/productSlice";

export const rootReducer = combineReducers({
  brands: brandReducer,
  products: productSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
