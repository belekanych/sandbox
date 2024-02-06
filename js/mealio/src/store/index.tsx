import { authSlice } from "@/modules/auth/store";
import { listSlice } from "@/modules/lists/store";
import { productSlice } from "@/modules/product/store";
import { shoppingCartSlice } from "@/modules/shoppingList/store";
import { combineSlices, configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: combineSlices(authSlice, listSlice, productSlice, shoppingCartSlice),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// Infer the type of `store`
export type AppStore = typeof store;
