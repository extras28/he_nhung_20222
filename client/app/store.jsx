import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore, EnhancedStore, Reducer } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, PersistConfig, PURGE, REGISTER } from 'redux-persist';
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

import authReducer from '../features/Auth/authSlice';
import dashboardSlice from '../features/Dashboard/dashboardSlice';
import plantReducer from '../features/Plant/plantSlice';

import appReducer from './appSlice';

const reducers = combineReducers({
    app: appReducer,
    auth: authReducer,
    dashboard: dashboardSlice,
    plant: plantReducer,
});

/**
 * @type {Reducer<State>}
 */
const rootReducer = (state, action) => {
    return reducers(state, action);
};

/**
 * @type {PersistConfig}
 */
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2,
    blacklist: [], // which reducer not to store
    whitelist: ['auth', 'app', 'pay'], // which reducer to store,
    transforms: [
        /* createBlacklistFilter(), createWhitelistFilter() */
        // createBlacklistFilter('auth', ['status']),
        createBlacklistFilter('app', ['lastTimePromptCodepush']),
    ],
};

/**
 * @type {EnhancedStore<State>}
 */
export const store = configureStore({
    reducer: persistReducer(persistConfig, rootReducer),
    devTools: true,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, /* REHYDRATE, */ PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store, undefined, () => {});
