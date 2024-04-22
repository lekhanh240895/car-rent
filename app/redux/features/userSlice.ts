import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { deleteCookie } from 'cookies-next';
export interface UserState {
  user: User | null;
  error: string | null;
  loading: boolean;
}

const initialState: UserState = {
  user: null,
  error: null,
  loading: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserRequest: (state) => {
      state.error = null;
      state.loading = true;
    },
    fetchUserSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
    },
    fetchUserFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
      deleteCookie('currentUser');
      deleteCookie('access_token');
      deleteCookie('refresh_token');
    },
    logout: (state) => {
      state.user = null;
      deleteCookie('access_token');
      deleteCookie('refresh_token');
      deleteCookie('currentUser');
    },
    resetUserSlice: () => initialState
  }
});

export const {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  logout,
  resetUserSlice
} = userSlice.actions;
export default userSlice;
