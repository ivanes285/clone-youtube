import { configureStore,combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import videoReducer from "./videoSlice";
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

export interface AppStore {
  user: ReturnType<typeof userReducer>;
  video: ReturnType<typeof videoReducer>;
}

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({user:userReducer,video:videoReducer}) //?combinamos a los reducers en uno solo
const persistedReducer = persistReducer(persistConfig, rootReducer) //?persistimos el reducer combinado para que se guarde en el storage del navegador

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>  //?middleware para que redux-persist funcione correctamente
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});


export let persistor = persistStore(store)

//!!Esta manera es la que se usa en la documentacion de redux-toolkit normalmente
// export const store = configureStore<AppStore>({
//   reducer: {
//     user: userReducer,
//     video: videoReducer,
//   },
// });