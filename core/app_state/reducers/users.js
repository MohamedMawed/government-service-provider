
export class CoreUserReducer {
  constructor() {

  }
  static intialState = {
    // offices : []
  }
  reduce(state = CoreUserReducer.intialState, action) {
    switch (action.type) {
      case 'persist/REHYDRATE':
        console.log('i have been called')
        let profile = {};
        try {
          profile = action.payload.userReducer.profile;
        } catch (error) {

        }
        return {
          ...state,
          profile,
          offices : [],
          gehat : []
        };

        
        case CoreUserReducer.SEND_ORDER:
        return {
          ...state,
        };
      case CoreUserReducer.EDIT_ORDER:
        return {
          ...state,
          ...action.attribute
        };

        case CoreUserReducer.GET_USER_GEHAT:
          return {
            ...state,
            gehat: [],
          };

      case CoreUserReducer.GET_USER_GEHAT_SUCCESS:
        return {
          ...state,
          gehat: action.gehat,
        };
      case CoreUserReducer.GET_USER_OFFICES:
        return {
          ...state,
          offices: []
        };
      case CoreUserReducer.GET_USER_OFFICES_SUCCESS:
        return {
          ...state,
          offices: action.offices
        };
      case CoreUserReducer.LOGIN_USER:
        return {
          ...state,
        };
      case CoreUserReducer.LOGIN_USER_PASSWORD:
        return {
          ...state,
          LoginLoading: true
        };
      case CoreUserReducer.LOGIN_USER_SUCCESS:
        return {
          ...state,
          LoginLoading: false,
          profile: action.profile
        };
      case CoreUserReducer.LOGIN_USER_FAIL:
        return {
          ...state,
          LoginLoading: false
        };
      case CoreUserReducer.VERIFY_REGISTER:
        return {
          ...state,
          VerifyRegisterLoading: true,
          RegisterData: action.RegisterData
        };
      case CoreUserReducer.VERIFY_REGISTER_SUCCESS:
        return {
          ...state,
          RegisterLoading: false
        };
      case CoreUserReducer.VERIFY_REGISTER_FAIL:
        return {
          ...state,
          RegisterLoading: false
        };


      case CoreUserReducer.REGISTER_USER:
        return {
          ...state,
          RegisterLoading: true,
        };
      case CoreUserReducer.REGISTER_USER_SUCCESS:
        return {
          ...state,
          profile: action.profile,
          VerifyRegisterLoading: false,
        };
      case CoreUserReducer.VERIFY_REGISTER_FAIL:
        return {
          ...state,
          VerifyRegisterLoading: false
        };

      case CoreUserReducer.LOGOUT_USER:
        return {
          ...state,
          profile : null,
          offices : [],
          gehat : []
        };


      default:
        return state;
    }
  }

  
  static EDIT_ORDER = 'USERS/EDIT_ORDER';
  static SEND_ORDER = 'USERS/SEND_ORDER';


  static GET_USER_SERVICES_PARAMS = 'USERS/GET_USER_SERVICES_PARAMS';
  
  static GET_USER_SERVICES = 'USERS/GET_USER_SERVICES';
  static GET_SERVICES_ADDONS = 'USERS/GET_SERVICES_ADDONS';
  
  static GET_USER_GEHAT = 'USERS/GET_USER_GEHAT';
  static GET_USER_GEHAT_SUCCESS = 'USERS/GET_USER_GEHAT_SUCCESS';


  static GET_USER_OFFICES = 'USERS/GET_USER_OFFICES';
  static GET_USER_OFFICES_SUCCESS = 'USERS/GET_USER_OFFICES_SUCCESS';



  static GET_USER_PREFERENCES = 'USERS/GET_USER_PREFERENCES';
  static USER_PREFERENCES_SUCCESS = 'USERS/USER_PREFERENCES_SUCCESS';

  static LOGIN_USER = 'USERS/LOGIN_USER';
  static LOGIN_USER_PASSWORD = 'USERS/LOGIN_USER_PASSWORD';

  static LOGIN_USER_SUCCESS = 'USERS/LOGIN_USER_SUCCESS';
  static LOGIN_USER_FAIL = 'USERS/LOGIN_USER_FAIL';
  static FACEBOOK_LOGIN = 'USERS/FACEBOOK_LOGIN'

  static VERIFY_REGISTER = 'USERS/VERIFY_REGISTER';
  static VERIFY_REGISTER_SUCCESS = 'USERS/VERIFY_REGISTER_SUCCESS';
  static VERIFY_REGISTER_FAIL = 'USERS/VERIFY_REGISTER_FAIL';

  static LOGIN_USER_SOCIAL = 'USERS/LOGIN_USER_SOCIAL';
  static LOGOUT_USER = 'USERS/LOGOUT_USER';
  static LOGOUT_USER_SUCCESS = 'USERS/LOGOUT_USER_SUCCESS';
  static SIGNUP_USER = 'SIGNUP_USER';

  static SEND_SMS_CODE = 'USERS/SEND_SMS_CODE';
  static SEND_SMS_CODE_FAIL = 'USERS/SEND_SMS_CODE_FAIL';
  static SEND_SMS_CODE_SUCCESS = 'USERS/SEND_SMS_CODE_SUCCESS';

  static SEND_LOGIN_SMS_CODE = 'USERS/SEND_LOGIN_SMS_CODE';
  static SEND_LOGIN_SMS_CODE_FAIL = 'USERS/SEND_LOGIN_SMS_CODE_FAIL';
  static SEND_LOGIN_SMS_CODE_SUCCESS = 'USERS/SEND_LOGIN_SMS_CODE_SUCCESS';

  static REGISTER_USER = 'USERS/REGISTER_USER';
  static REGISTER_USER_SUCCESS = 'USERS/REGISTER_USER_SUCCESS';
  static REGISTER_USER_FAIL = 'USERS/REGISTER_USER_FAIL';

  static sendUpdateVerificationCode = (phone, responseHandler) => {
    return {
      type: CoreUserReducer.SEND_UPDATE_VERIFICATIONCODE,
      phone,
      responseHandler
    };
  }

  static EditOrder = (attribute) => {
    return {
      type: CoreUserReducer.EDIT_ORDER,
      attribute
    };
  }

  
  static getServicesAddons = (attribute, responseHandler) => {
    return {
      type: CoreUserReducer.GET_SERVICES_ADDONS,
      srv_id : attribute.srv_id,
      responseHandler
    };
  }

  static ChangePhone = (UpdatedData, responseHandler) => {
    return {
      type: CoreUserReducer.CHANGE_PHONE_NUMBER,
      UpdatedData,
      responseHandler
    };
  }


  
  static SendOrder = (order, responseHandler) => {
    return {
      type: CoreUserReducer.SEND_ORDER,
      order,
      responseHandler
    };
  }
  
  static ChangePhoneSuccess = (resp) => {
    return {
      type: CoreUserReducer.CHANGE_PHONE_NUMBER_SUCCESS,
      NewData: resp
    };
  }

  static UpdateConsumerPreferences = (UpdatedData, responseHandler) => {
    return {
      type: CoreUserReducer.UPDATE_CONSUMER_PREFERENCES,
      UpdatedData,
      responseHandler
    };
  }


  
  static getgehatSuccess = (gehat) => {
    return {
      type: CoreUserReducer.GET_USER_GEHAT_SUCCESS,
      gehat
    };
  }
  static getGehat = () => {
    return {
      type: CoreUserReducer.GET_USER_GEHAT,
    };
  }

  static getOffices = (attribute , responseHandler) => {
    return {
      type: CoreUserReducer.GET_USER_OFFICES,
      parent_id : attribute.geha_id ,
      responseHandler : responseHandler
    };
  }

  static getOfficesSuccess = (offices) => {
    return {
      type: CoreUserReducer.GET_USER_OFFICES_SUCCESS,
      offices
    };
  }
  static getServices = (service , responseHandler) => {
    return {
      type: CoreUserReducer.GET_USER_SERVICES,
      geha_id : service.geha_id , 
      off_id : service.off_id , 
      responseHandler : responseHandler
    };
  }
  static getServicesParams = (service , responseHandler) => {
    return {
      type: CoreUserReducer.GET_USER_SERVICES_PARAMS,
      srv_id : service.srv_id , 
      office : service.office,
      responseHandler : responseHandler
    };
  }
  

  static getServicesSuccess = (offices) => {
    return {
      type: CoreUserReducer.GET_USER_OFFICES_SUCCESS,
      offices: offices
    };
  }

  static UpdateConsumerPreferencesSuccess = (resp) => {
    return {
      type: CoreUserReducer.UPDATE_CONSUMER_PREFERENCES_SUCCESS,
      UpdatedData: resp,
    };
  }
  static UpdateConsumerPreferencesFail = () => {
    return {
      type: CoreUserReducer.UPDATE_CONSUMER_PREFERENCES_FAIL,
    };
  }

  static registerUser = (RegisterData, responseHandler) => {
    return {
      type: CoreUserReducer.REGISTER_USER,
      RegisterData,
      responseHandler
    };
  }

  static registerUserFail = () => {
    return {
      type: CoreUserReducer.REGISTER_USER_FAIL
    };
  }
  static registerUserSuccess = (profile) => {
    return {
      type: CoreUserReducer.REGISTER_USER_SUCCESS,
      profile
    };
  }


  static loginUser = (loginData, responseHandler) => {
    return {
      type: CoreUserReducer.LOGIN_USER,
      loginData,
      responseHandler
    };
  }
  static loginUserPassword = (loginData, responseHandler) => {
    return {
      type: CoreUserReducer.LOGIN_USER_PASSWORD,
      loginData,
      responseHandler
    };
  }
  static loginUserFail = () => {
    return {
      type: CoreUserReducer.LOGIN_USER_FAIL
    };
  }
  static loginUserSuccess = (profile) => {
    return {
      type: CoreUserReducer.LOGIN_USER_SUCCESS,
      profile
    };
  }

  static VerifyRegister = (RegisterData, responseHandler) => {
    return {
      type: CoreUserReducer.VERIFY_REGISTER,
      RegisterData,
      responseHandler
    };
  }
  static VerifyRegisterFail = () => {
    return {
      type: CoreUserReducer.VERIFY_REGISTER_FAIL
    };
  }
  static VerifyRegisterSuccess = () => {
    return {
      type: CoreUserReducer.VERIFY_REGISTER_SUCCESS,
    };
  }

  static sendLoginVerificationCode = (phone, responseHandler) => {
    return {
      type: CoreUserReducer.SEND_LOGIN_SMS_CODE,
      phone,
      responseHandler
    };
  }
  static sendLoginVerificationCodeSuccess = () => {
    return {
      type: CoreUserReducer.SEND_LOGIN_SMS_CODE_SUCCESS,
    };
  }
  static sendLoginVerificationCodeFail = () => {
    return {
      type: CoreUserReducer.SEND_LOGIN_SMS_CODE_FAIL,

    };
  }

  static sendVerificationCode = (phone, responseHandler) => {
    return {
      type: CoreUserReducer.SEND_SMS_CODE,
      phone,
      responseHandler
    };
  }
  static sendVerificationCodeSuccess = (phone) => {
    return {
      type: CoreUserReducer.SEND_SMS_CODE_SUCCESS
    };
  }
  static sendVerificationCodeFail = () => {
    return {
      type: CoreUserReducer.SEND_SMS_CODE_FAIL,

    };
  }

  static logoutUser = (responseHandler) => {
    return {
      type: CoreUserReducer.LOGOUT_USER,
      responseHandler
    };
  }


  static logoutUserSuccess = () => {
    return {
      type: CoreUserReducer.LOGOUT_USER_SUCCESS
    };
  }

  static getUserPreferences = (responseHandler) => {
    return {
      type: CoreUserReducer.GET_USER_PREFERENCES,
      responseHandler
    };
  }

  static userPreferencesSuccess = (preferences) => {
    return {
      type: CoreUserReducer.USER_PREFERENCES_SUCCESS,
      preferences
    };
  }

  static signUpUser = (signUpData) => {
    return {
      type: CoreUserReducer.SIGNUP_USER,
      signUpData
    };
  }
}
