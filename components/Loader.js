import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator
} from 'react-native';
import { colors, fonts, metrics } from '../themes';
import Spinner from 'react-native-spinkit'
import { Width } from '../constant/dimention';
import { connect } from 'react-redux';

 class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : false,
    }
  }

  
  render() {
    const { loaderColor } = this.props;
    if(this.props.pageLoading)
    return (
      <View style={{elevation:3 ,width: '100%', height: metrics.screenHeight, position: 'absolute', zIndex: 3, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,.6)' }}>
        {/* <ActivityIndicator size="large" color={loaderColor || colors.appThemeOrange} /> */}
        <View style={{
          width : metrics.screenWidth*.2,
          height : metrics.screenWidth*.15,
          borderRadius : metrics.borderRadius,
          backgroundColor : colors.lightGray,
          justifyContent:'center' ,
          alignItems : 'center'
        }}>
          <Spinner isVisible={true} size={50} type={'ThreeBounce'} color={"#ff5131"}/>  
        </View>
      </View>
    );
    else return null
  }
}





function mapStateToProps(state) {
  return {
    pageLoading: state.UIReducer.pageLoading ? state.UIReducer.pageLoading : false,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Loader);
