import React, { Component } from 'react';
import {
  View,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import LoginPresenter from './newsPresenter';
import { WebView } from 'react-native-webview';
import { metrics } from '../../themes';

class NewsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      emailError: 'error is here ',
      passwordError: ' password is incorrect'
    };
    this.mLoginPresenter = new LoginPresenter(this);
  }
  componentDidMount() {
    StatusBar.setBarStyle('dark-content', false);
  }
  render() {
    return (
      <View style={{
        width: metrics.screenWidth,
        height: metrics.screenHeight
      }}>
        <WebView
          source={{ uri: 'https://www.youm7.com/' }}
          style={{
            width: '100%',
            height: '100%'
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          startInLoadingState={true}
          scalesPageToFit={true}
        />

      </View>
    );
  }
}



function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsView);
