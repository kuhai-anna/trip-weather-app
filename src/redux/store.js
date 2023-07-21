import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { filterReducer } from './filter/filterSlice';
import {
  weeklyWeatherReducer,
  weatherTodayReducer,
} from './weather/weatherSlice';
import { tripsReducer } from './trips/tripsSlice';

const rootPersistConfig = {
  key: 'root',
  storage,
};
// whitelist: ['trips'],

const rootReducer = combineReducers({
  trips: tripsReducer,
  filter: filterReducer,
  weeklyWeather: weeklyWeatherReducer,
  weatherToday: weatherTodayReducer,
});

const persistedRootReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
