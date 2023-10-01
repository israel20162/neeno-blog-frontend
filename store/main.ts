
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";
import themeReducer from './slices/themeSlice'
import { statesApi } from './services/statesApi';
import { mainApi } from './services/mainApi';
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistCartConfig = {
  key: 'root',
  storage,
}
const persistUserConfig = {
  key: 'user',
  storage,
}
const persistThemeConfig = {
  key: 'theme',
  storage,
}


const persistedCartReducer = persistReducer(persistCartConfig, cartReducer)
const persistedUserReducer = persistReducer(persistUserConfig, userReducer)
const persistedThemeReducer = persistReducer(persistThemeConfig, themeReducer)


export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    theme: persistedThemeReducer,
    user: persistedUserReducer,
    userSlice: userReducer,
    [statesApi.reducerPath]: statesApi.reducer,
    //[registerApi.reducerPath]: registerApi.reducer,
    [mainApi.reducerPath]: mainApi.reducer,
   // [tagsApi.reducerPath]: tagsApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(mainApi.middleware, ),


})

export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch