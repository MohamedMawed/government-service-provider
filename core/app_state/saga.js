import { all, takeLatest } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import { StackActions, NavigationActions } from 'react-navigation';
/* global fetch */

import {
  logInWithPhoneSaga,
  logInWithPasswordSaga,
  logOutSaga,
  userPreferencesSaga,
  SendSMSVerificationCode,
  VERIFYREGISTER,
  REGISTERUSER,
  SendLoginSMSVerificationCode,
  UpdateConsumerPreferences,
  sendUpdateVerificationCode,
  ChangePhoneNumber,
  GET_USER_SERVICES,
  GET_USER_OFFICES,
  GET_SERVICES_ADDONS,
  GET_USER_SERVICES_PARAMS,
  SEND_ORDER,
  GET_USER_GEHAT,
} from './sagas/usersSagas';

import { CoreUserReducer } from './reducers/users';

import NavigatorService from './../../../NavigationService';
import { CoreUIReducer } from './reducers/ui';


es6promise.polyfill();

export function checkToken(resp) {
  if (
    resp.message == 'Tokens conflict.' ||
    resp.message == 'Invalid JWT Token'
  ) {
    const resetAction = StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'LandingPage' }),
        NavigationActions.navigate({ routeName: 'RegisterStep1' })
      ]
    });
    NavigatorService.getNavigationRef().dispatch(resetAction);
  }
}

function* rootSaga() {
  yield all([

    
    takeLatest(CoreUserReducer.SEND_ORDER, SEND_ORDER),
    
    takeLatest(CoreUserReducer.GET_USER_GEHAT, GET_USER_GEHAT),
    takeLatest(CoreUserReducer.GET_SERVICES_ADDONS, GET_SERVICES_ADDONS),
    takeLatest(CoreUserReducer.GET_USER_SERVICES_PARAMS, GET_USER_SERVICES_PARAMS),
    takeLatest(CoreUserReducer.GET_USER_SERVICES, GET_USER_SERVICES),
    takeLatest(CoreUserReducer.LOGIN_USER, logInWithPhoneSaga),
    takeLatest(CoreUserReducer.GET_USER_OFFICES, GET_USER_OFFICES),
    takeLatest(CoreUserReducer.LOGIN_USER_PASSWORD, logInWithPasswordSaga),
    takeLatest(CoreUserReducer.SEND_SMS_CODE, SendSMSVerificationCode),
    takeLatest(
      CoreUserReducer.SEND_LOGIN_SMS_CODE,
      SendLoginSMSVerificationCode
    ),

    takeLatest(CoreUserReducer.VERIFY_REGISTER, VERIFYREGISTER),
    takeLatest(CoreUserReducer.REGISTER_USER, REGISTERUSER),
    takeLatest(CoreUserReducer.GET_USER_PREFERENCES, userPreferencesSaga),
    
    takeLatest(CoreUserReducer.LOGOUT_USER, logOutSaga),



  ]);
}

export default rootSaga;
