import React, { Component } from 'react';

import {
  ActivityIndicator,
  StatusBar,
  View,
  Image
} from 'react-native';

import { connect } from 'react-redux';
import styles from './styling';

import { colors, metrics, images } from '../../themes';
import SplashPresenter from './splashPresenter';
import { CoreUserReducer } from '../../core/app_state/reducers/users';
const getServices = CoreUserReducer.getServices
const getGehat = CoreUserReducer.getGehat

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: {},
      enablegeolocation: true,
      alertnum: 0,
      currentLocationLoad: false,
      showAlert: false
    };
    this.mSplashPresenter = new SplashPresenter(this);
  }

  async componentDidMount() {
      setTimeout(() => {
        if(this.props.profile && this.props.profile.token)  {
          this.props.getGehat()
          // this.props.getServices()
          this.props.navigation.replace('MyDrawerNavigator') }
          else {
             this.props.navigation.replace('Login')
          }
      }, 1500);
  }
  render() {
    return (
      <View
        style={styles.linearGradient}
      >
        <Image style={{
                height: metrics.screenWidth * .5,
                width: metrics.screenWidth * .5,
                margin: metrics.screenWidth * .05,
                resizeMode: 'contain'
              }} source={require('./../../images/army_logo.png')} />
        <ActivityIndicator
          style={styles.activityIndicator}
          size={'large'}
          color={colors.accentColorExpert}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile : state.userReducer.profile
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getServices: () => { dispatch(getServices()) },
    getGehat: () => { dispatch(getGehat()) },
    
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Splash);
