import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  fetchUserFailure,
  fetchUserRequest,
  fetchUserSuccess
} from './features/userSlice';
import { FetchSuccess } from '../lib/ApiManager/ApiMethods';
import ApiManager from '../lib/ApiManager/ApiManager';

type Action = {
  type: string;
  payload: {
    locale: string;
  };
};

export function* fetchUser(action: Action) {
  const { locale } = action.payload;

  try {
    yield put(fetchUserRequest());
    const res: FetchSuccess<User> = yield call(ApiManager.getMe, locale);
    const { data: user } = res.body;
    yield put(fetchUserSuccess(user));
  } catch (e: any) {
    const error: CustomError = e.body?.error;
    if (error) {
      const { message, error_id } = error;
      const errorMessage = `${message} (${error_id})`;
      yield put(fetchUserFailure(errorMessage));
    } else {
      yield put(fetchUserFailure('Server error! Failed to fetch data!'));
    }
  }
}

function* watchFetchUser() {
  yield takeEvery('user/fetchUser', fetchUser);
}

export default function* rootSaga() {
  yield all([watchFetchUser()]);
}
