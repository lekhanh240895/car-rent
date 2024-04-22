import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
import userSlice from './features/userSlice';
import appSlice from './features/appSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    app: appSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['app/setRentalDetail'],
        ignoredPaths: [
          'app.rentDetail.pickUp.date',
          'app.rentDetail.dropOff.date'
        ]
      }
    }).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDisPatch = typeof store.dispatch;
