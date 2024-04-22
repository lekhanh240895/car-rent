import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type RentDetail = {
  pickUp: {
    location: FilterLocation | null;
    date: Date | null;
  };
  dropOff: {
    location: FilterLocation | null;
    date: Date | null;
  };
};

type SummaryInfo = {
  total: number | null;
};

export interface AppState {
  rentDetail: RentDetail;
  summaryInfo: SummaryInfo;
}

const initialState: AppState = {
  rentDetail: {
    pickUp: {
      location: null,
      date: null
    },
    dropOff: {
      location: null,
      date: null
    }
  },
  summaryInfo: {
    total: null
  }
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setRentalDetail: (state, action: PayloadAction<RentDetail>) => {
      state.rentDetail = action.payload;
    },
    setSummaryInfo: (state, action: PayloadAction<SummaryInfo>) => {
      state.summaryInfo = action.payload;
    }
  }
});

export const { setRentalDetail, setSummaryInfo } = appSlice.actions;
export default appSlice;
