import fetch from 'isomorphic-unfetch';
import NavigationService from './../../../NavigationService';
import { Setting } from './../../../settings';
import { StackActions, NavigationActions } from 'react-navigation';

export const BASEURL = Setting.baseURL;

class API {
  constructor() {
    this.baseUrl = `${Setting.baseURL}`;

    this.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };

    this.post = this.post.bind(this);
    this.get = this.get.bind(this);
    this.delete = this.delete.bind(this);
    this.put = this.put.bind(this);
  }
  post({
    customHeaders = null,
    needsAuthentication = false,
    requestPayload = {},
    customURL = '',
    url
  }) {
    const completeUrl = `${this.baseUrl}${url}`;

    const headers = { ...this.headers, ...customHeaders };
    const body = JSON.stringify(requestPayload);
    
    return fetch(completeUrl, {
      method: 'post',
      headers,
      body
    })
      .then(resp => {
        
        return Promise.resolve(resp);
      })
      .catch(error => {
        console.log(error)
        if (error.message == 'Network request failed') {
          const resetAction = StackActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: 'NetworkError' })]
          });
          NavigationService.getNavigationRef().dispatch(resetAction);
          return Promise.reject(error.message);
        }

        return Promise.reject(error);
      });
  }

  put({
    customHeaders = null,
    needsAuthentication = false,
    requestPayload = {},
    customURL = '',
    url
  }) {
    const completeUrl = `${this.baseUrl}/${url}`;
    const headers = { ...this.headers, ...customHeaders };
    const body = JSON.stringify(requestPayload);
    
    return fetch(completeUrl, {
      method: 'put',
      headers,
      body
    })
      .then(resp => {
        
        return Promise.resolve(resp);
      })
      .catch(error => {
        
        console.log(error)
        if (error.message == 'Network request failed') {
          const resetAction = StackActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: 'NetworkError' })]
          });
          NavigationService.getNavigationRef().dispatch(resetAction);
          return Promise.reject(error.message);
        }

        return Promise.reject(error);
      });
  }

  get({ url, customHeaders = null }) {
    const completeUrl = `${this.baseUrl}${url}`;
    const headers = { ...this.headers, ...customHeaders };
    
    return fetch(completeUrl, {
      method: 'get',
      headers
    })
      .then(resp => {
        
        return Promise.resolve(resp);
      })
      .catch(error => {
        
        console.log(error)
        if (error.message == 'Network request failed') {
          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'NetworkError' })]
          });
          NavigationService.getNavigationRef().dispatch(resetAction);
          return Promise.reject(error.message);
        }

        return Promise.reject(error);
      });
  }
  delete({ url, customHeaders, id }) {
    const completeUrl = `${this.baseUrl}${url}`;
    const headers = { ...this.headers, ...customHeaders };
    
    return fetch(completeUrl, {
      method: 'delete',
      headers
    })
      .then(resp => {
        
        return Promise.resolve(resp);
      })
      .catch(error => {
        
        console.log(error)
        if (error.message == 'Network request failed') {
          const resetAction = StackActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: 'NetworkError' })]
          });
          NavigationService.getNavigationRef().dispatch(resetAction);
          return Promise.reject(error.message);
        }

        return Promise.reject(error);
      });
  }
}

export default new API();
