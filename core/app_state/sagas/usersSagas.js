import { call, put, select } from 'redux-saga/effects';
import _ from 'lodash';
import API from '../../services/Api';
import { CoreUserReducer } from '../reducers/users';
import { CoreUIReducer } from '../reducers/ui';
import { checkToken } from '../saga';

const { sendVerificationCode } = CoreUserReducer;
const { sendVerificationCodeSuccess } = CoreUserReducer;
const { sendVerificationCodeFail } = CoreUserReducer;
const { sendLoginVerificationCodeSuccess } = CoreUserReducer;
const { sendLoginVerificationCodeFail } = CoreUserReducer;
const { VerifyRegisterFail } = CoreUserReducer;
const { VerifyRegisterSuccess } = CoreUserReducer;
const { getOfficesSuccess } = CoreUserReducer;
const { getgehatSuccess } = CoreUserReducer;
const { loginUserFail } = CoreUserReducer;
const { loginUserSuccess } = CoreUserReducer;
const { getUserPreferences } = CoreUserReducer;
const { userPreferencesSuccess } = CoreUserReducer;
const { UpdateConsumerPreferencesSuccess } = CoreUserReducer;
const { ChangePhoneSuccess } = CoreUserReducer;
const { logoutUserSuccess } = CoreUserReducer;
const { turnOffPageLoading } = CoreUIReducer;
const { turnOnPageLoading } = CoreUIReducer;

getToken = state => state.userReducer.profile.token;


export function* SendLoginSMSVerificationCode(action) {
  try {
    const res = yield call(API.post, {
      url: 'consumer/sms_verification/login',
      requestPayload: {
        phone: `${action.phone}`
      }
    });
    const JSONresponse = yield res.json();
    if (!res.ok) {
      yield put(sendLoginVerificationCodeFail());
      if (action.responseHandler && action.responseHandler.onFail) {
        action.responseHandler.onFail(JSONresponse);
      }
    } else {
      yield put(sendLoginVerificationCodeSuccess());
      if (action.responseHandler && action.responseHandler.onSuccess) {
        action.responseHandler.onSuccess();
      }
    }
  } catch (err) {
    yield put(sendLoginVerificationCodeFail());
    if (action.responseHandler && action.responseHandler.onFail) {
      action.responseHandler.onFail(err);
    }
  }
}

export function* sendUpdateVerificationCode(action) {
  yield put(turnOnPageLoading());
  try {
    const res = yield call(API.post, {
      url: 'consumer/sms_verification',
      requestPayload: {
        phone: `${action.phone}`
      }
    });
    const JSONresponse = yield res.json();

    if (!res.ok) {
      yield put(turnOffPageLoading());
      if (action.responseHandler && action.responseHandler.onFail) {
        action.responseHandler.onFail(JSONresponse.message);
      }
    } else {
      yield put(turnOffPageLoading());
      if (action.responseHandler && action.responseHandler.onSuccess) {
        action.responseHandler.onSuccess();
      }
    }
  } catch (err) {
    yield put(turnOffPageLoading());
    if (action.responseHandler && action.responseHandler.onFail) {
      action.responseHandler.onFail(err);
    }
  }
}

export function* SendSMSVerificationCode(action) {
  try {
    const res = yield call(API.post, {
      url: 'consumer/sms_verification',
      requestPayload: {
        phone: `${action.phone}`
      }
    });
    const JSONresponse = yield res.json();

    if (!res.ok) {
      yield put(sendVerificationCodeFail());
      if (action.responseHandler && action.responseHandler.onFail) {
        action.responseHandler.onFail(JSONresponse.message);
      }
    } else {
      yield put(sendVerificationCodeSuccess());
      if (action.responseHandler && action.responseHandler.onSuccess) {
        action.responseHandler.onSuccess();
      }
    }
  } catch (err) {
    yield put(sendVerificationCodeFail());
    if (action.responseHandler && action.responseHandler.onFail) {
      action.responseHandler.onFail(err);
    }
  }
}
export function* VERIFYREGISTER(action) {
  try {
    const res = yield call(API.post, {
      url: 'consumer/create/validate',
      requestPayload: action.RegisterData
    });

    const JSONresponse = yield res.json();
    if (!res.ok) {
      yield put(VerifyRegisterFail());
      if (action.responseHandler && action.responseHandler.onFail) {
        action.responseHandler.onFail(JSONresponse);
      }
    } else {
      yield put(VerifyRegisterSuccess());
      yield put(
        sendVerificationCode(action.RegisterData.phone, action.responseHandler)
      );
      if (action.responseHandler && action.responseHandler.onSuccess) {
        action.responseHandler.onSuccess();
      }
    }
  } catch (err) {
    if (action.responseHandler && action.responseHandler.onFail) {
      action.responseHandler.onFail();
    }
    yield put(VerifyRegisterFail());
  }
}
export function* REGISTERUSER(action) {
  try {
    yield put(turnOnPageLoading());    
    const res = yield call(API.post, {
      url: 'accounts/signup/',
      requestPayload: action.RegisterData
    });
    console.log('hey i am here' , res)
    const JSONresponse = yield res.json();
yield put(turnOffPageLoading());    
    if (!res.ok) {
      yield put(VerifyRegisterFail());
      if (action.responseHandler && action.responseHandler.onFail) {
        action.responseHandler.onFail(JSONresponse);
      }
    } else {
      yield put(loginUserSuccess(JSONresponse));
      yield put(VerifyRegisterSuccess(JSONresponse));
      if (action.responseHandler && action.responseHandler.onSuccess) {
        action.responseHandler.onSuccess();
      }
    }
  } catch (err) {
   yield put(turnOffPageLoading());     
    yield put(VerifyRegisterFail());
    if (action.responseHandler && action.responseHandler.onFail) {
      action.responseHandler.onFail(err);
    }
  }
}
export function* logInWithPhoneSaga(action) {
  try {
    console.log('action', action)
    yield put(turnOnPageLoading());    
    const res = yield call(API.post, {
      url: 'accounts/login/',
      requestPayload: {
        username: action.loginData.username,
        password: action.loginData.password
      }
    });
    const JSONresponse = yield res.json();
    console.log('JSONresponse', JSONresponse)
    yield put(turnOffPageLoading());    

    if (!res.ok) {
      yield put(loginUserFail());
      if (action.responseHandler && action.responseHandler.onFail) {
        action.responseHandler.onFail(JSONresponse);
      }
    } else {
      console.log('JSONresponse',JSONresponse)
      yield put(loginUserSuccess(JSONresponse));
      if (action.responseHandler && action.responseHandler.onSuccess) {
        action.responseHandler.onSuccess();
      }
    }
  } catch (err) {
    yield put(turnOffPageLoading());    
    yield put(loginUserFail());
    if (action.responseHandler && action.responseHandler.onFail) {
      action.responseHandler.onFail(err);
    }
  }
}


export function* GET_SERVICES_ADDONS(action) {
  try {
    yield put(turnOnPageLoading());    
    const token = yield select(getToken);
    console.log('token ',action.srv_id)
    const res = yield call(API.get, {
      url: 'gehat/ServiceAddon/?service='+action.srv_id,
      customHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
    const JSONresponse = yield res.json();
    // console.log('JSONresponse',JSONresponse)
    yield put(turnOffPageLoading());    
    

    if (!res.ok) { 
      global.openToast("من فضلك تأكد من الإتصال بالإنترنت")

    } else {
      // yield put(getgehatSuccess(JSONresponse));
      if (action.responseHandler && action.responseHandler.onSuccess) {
        action.responseHandler.onSuccess(JSONresponse);
      }
    }
  } catch (err) {
    yield put(turnOffPageLoading());   
      global.openToast("من فضلك تأكد من الإتصال بالإنترنت")
      // yield put(loginUserFail());
  }
}
export function* GET_USER_GEHAT(action) {
  try {
    yield put(turnOnPageLoading());    
    const token = yield select(getToken);
    console.log('token ',token)
    const res = yield call(API.get, {
      url: 'gehat/office/0',
      customHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
    const JSONresponse = yield res.json();
    // console.log('JSONresponse',JSONresponse)
    yield put(turnOffPageLoading());    
    

    if (!res.ok) { 
      global.openToast("من فضلك تأكد من الإتصال بالإنترنت")

    } else {
      yield put(getgehatSuccess(JSONresponse));
      if (action.responseHandler && action.responseHandler.onSuccess) {
        action.responseHandler.onSuccess(JSONresponse);
      }
    }
  } catch (err) {
    yield put(turnOffPageLoading());   
      global.openToast("من فضلك تأكد من الإتصال بالإنترنت")
      // yield put(loginUserFail());
  }
}

export function* GET_USER_OFFICES(action) {
  try {
yield put(turnOnPageLoading());    
    const token = yield select(getToken);
    const res = yield call(API.get, {
      url: 'gehat/office/'+action.parent_id,
      customHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
    const JSONresponse = yield res.json();
yield put(turnOffPageLoading());    
    if (!res.ok) {
      if (action.responseHandler && action.responseHandler.onFail) {
        action.responseHandler.onFail(JSONresponse);
      }
      global.openToast("من فضلك تأكد من الإتصال بالإنترنت")
    } else {
      if (action.responseHandler && action.responseHandler.onSuccess) {
        action.responseHandler.onSuccess(JSONresponse);
      }
      // yield put(getOfficesSuccess(JSONresponse));
    }
  } catch (err) {
    yield put(turnOffPageLoading());    
    if (action.responseHandler && action.responseHandler.onFail) {
      action.responseHandler.onFail(err);
    }
    global.openToast("من فضلك تأكد من الإتصال بالإنترنت")
  }
}

export function* GET_USER_SERVICES(action) {
  try {
yield put(turnOnPageLoading());    
    const token = yield select(getToken);
    // console.log('token ',action.id)
    const res = yield call(API.get, {
      url: 'gehat/office/service/?office='+action.off_id,
      customHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
    const JSONresponse = yield res.json();
    // console.log('JSONresponse',JSONresponse)
yield put(turnOffPageLoading());    
    if (!res.ok) {
      if (action.responseHandler && action.responseHandler.onFail) {
        action.responseHandler.onFail(JSONresponse);
      }
    } else {
      if (action.responseHandler && action.responseHandler.onSuccess) {
        action.responseHandler.onSuccess(JSONresponse);
      }
    }
  } catch (err) {
  yield put(turnOffPageLoading());      
    if (action.responseHandler && action.responseHandler.onFail) {
      action.responseHandler.onFail(err);
    }
  }
}


export function* GET_USER_SERVICES_PARAMS(action) {
  try {
yield put(turnOnPageLoading());    
    const token = yield select(getToken);
    console.log('mawedACTION',action)
    const res = yield call(API.get, {
      url: 'gehat/parameters/?geha='+action.office+'&service='+action.srv_id,
      customHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
    const JSONresponse = yield res.json();
    console.log('JSONresponse',JSONresponse)
yield put(turnOffPageLoading());    
    if (!res.ok) {
      if (action.responseHandler && action.responseHandler.onFail) {
        action.responseHandler.onFail(JSONresponse);
      }
    } else {
      if (action.responseHandler && action.responseHandler.onSuccess) {
        action.responseHandler.onSuccess(JSONresponse);
      }
    }
  } catch (err) {
    yield put(turnOffPageLoading());      
    if (action.responseHandler && action.responseHandler.onFail) {
      action.responseHandler.onFail(err);
    }
  }
}





export function* logInWithPasswordSaga(action) {
  console.log('logInWithPasswordSaga', action);
  try {
    const res = yield call(API.post, {
      url: 'consumer/login',
      requestPayload: {
        email: action.loginData.email, // phone: action.loginData.phone,
        password: action.loginData.password // verification_code: action.loginData.verification_code
      }
    });
    const JSONresponse = yield res.json();
    console.log('my subservices ',JSONresponse )
    if (!res.ok) {
      yield put(loginUserFail());
      if (action.responseHandler && action.responseHandler.onFail) {
        action.responseHandler.onFail(JSONresponse);
      }
    } else {
      yield put(loginUserSuccess(JSONresponse.data));
      yield put(getUserPreferences(action.responseHandler));
    }
  } catch (err) {
    yield put(loginUserFail());
    if (action.responseHandler && action.responseHandler.onFail) {
      action.responseHandler.onFail();
    }
  }
}


export function* SEND_ORDER(action) {
  console.log('SEND_ORDER', action);
  try {
    const token = yield select(getToken);
    console.log('token ',action.id)
    const res = yield call(API.post, {
      url: 'gehat/order/',
      customHeaders: {
        'Authorization': `Bearer ${token}`
      },
      requestPayload: {
        ...action.order
      }
    });
    const JSONresponse = yield res.json();
    console.log('my order ',JSONresponse )
    if (!res.ok) {
    } else {
    }
  } catch (err) {
  }
}




export function* userPreferencesSaga(action) {
  try {
    const token = yield select(getToken);
    const res = yield call(API.get, {
      url: 'consumer/preferences',
      customHeaders: {
        'X-Authorization': `Bearer ${token}`
      }
    });
    const JSONresponse = yield res.json();

    if (!res.ok) {
      const error = res.errors ? res.errors[0].message : res.message;
      if (action.responseHandler && action.responseHandler.onFail) {
        action.responseHandler.onFail(error);
      }
      checkToken(JSONresponse);
    } else if (res.ok && Object.keys(JSONresponse.data).length !== 0) {
      yield put(userPreferencesSuccess(JSONresponse.data));
      if (action.responseHandler && action.responseHandler.onSuccess) {
        action.responseHandler.onSuccess();
      }
    }
  } catch (err) {
    if (action.responseHandler && action.responseHandler.onFail) {
      action.responseHandler.onFail(err);
    }
  }
}

export function* UpdateConsumerPreferences(action) {
  yield put(turnOnPageLoading());
  try {
    const token = yield select(getToken);
    let data = {};
    if (action.UpdatedData.notification) {
      data = action.UpdatedData;
    } else if (action.UpdatedData.phone) {
      data.email = action.UpdatedData.email;
      data.phone = action.UpdatedData.phone;
      data.verification_code = action.UpdatedData.verification_code;
    } else {
      data.first_name = action.UpdatedData.firstName;
      data.last_name = action.UpdatedData.lastName;
      data.gender = action.UpdatedData.gender;
      data.birthday = action.UpdatedData.birthday;
    }
    const res = yield call(API.put, {
      url: 'consumer/preferences',
      customHeaders: {
        'X-Authorization': `Bearer ${token}`
      },
      requestPayload: data
    });
    const JSONresponse = yield res.json();
    if (!res.ok) {
      yield put(turnOffPageLoading());
      if (action.responseHandler && action.responseHandler.onFail) {
        action.responseHandler.onFail(JSONresponse);
      }
      checkToken(JSONresponse);
    } else {
      yield put(turnOffPageLoading());
      yield put(UpdateConsumerPreferencesSuccess(JSONresponse.data));
      if (action.responseHandler && action.responseHandler.onSuccess) {
        action.responseHandler.onSuccess();
      }
    }
  } catch (err) {
    yield put(turnOffPageLoading());
    if (action.responseHandler && action.responseHandler.onFail) {
      action.responseHandler.onFail(err);
    }
  }
}

export function* ChangePhoneNumber(action) {
  yield put(turnOnPageLoading());
  try {
    const token = yield select(getToken);
    const res = yield call(API.post, {
      url: 'consumer/change_phone',
      customHeaders: {
        'X-Authorization': `Bearer ${token}`
      },
      requestPayload: {
        phone: action.UpdatedData.phone,
        verification_code: action.UpdatedData.verification_code
      }
    });
    const JSONresponse = yield res.json();

    if (!res.ok) {
      yield put(turnOffPageLoading());

      if (action.responseHandler && action.responseHandler.onFail) {
        action.responseHandler.onFail(JSONresponse);
      }
      checkToken(JSONresponse);
    } else {
      yield put(turnOffPageLoading());
      yield put(ChangePhoneSuccess(JSONresponse.data));
      if (action.responseHandler && action.responseHandler.onSuccess) {
        action.responseHandler.onSuccess();
      }
    }
  } catch (err) {
    yield put(turnOffPageLoading());
    if (action.responseHandler && action.responseHandler.onFail) {
      action.responseHandler.onFail(err);
    }
  }
}

export function* logOutSaga(action) {
  try {
    const token = yield select(getToken);
    const res = yield call(API.get, {
      url: 'consumer/logout',
      customHeaders: {
        'X-Authorization': `Bearer ${token}`
      }
    });
    const JSONresponse = yield res.json();
    if (!res.ok) {
      if (action.responseHandler && action.responseHandler.onFail) {
        action.responseHandler.onFail(JSONresponse);
      }
    } else {
      yield put(logoutUserSuccess());
      if (action.responseHandler && action.responseHandler.onSuccess) {
        action.responseHandler.onSuccess();
      }
    }
  } catch (err) {}
}
