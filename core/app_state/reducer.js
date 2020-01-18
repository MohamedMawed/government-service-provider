
import {  persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


export class reducer {
  constructor(userReducer,UIReducer) {
    this.userReducer = userReducer;
    this.UIReducer = UIReducer;
    this.userPersistConfig = {
      key: 'userreducer',
      storage,
      blacklist: ['profile']
    };
    this.rootconfig = {
      key: 'root',
      storage,
      whitelist: ['userReducer']
    };
  }


  getReducers=() => {
    const userReducer = this.userReducer.reduce;
    const UIReducer = this.UIReducer.reduce;
    return persistCombineReducers(this.rootconfig, {
      userReducer,
      UIReducer
    });
  }
}
