import { RootState } from './store';

export const userSelector = (state: RootState) => state.user;
export const appSelector = (state: RootState) => state.app;
