import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  StatusBar,
  SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import LoginPresenter from './loginPresenter';
import { Width, Height } from './../../constant/dimention';
import { metrics, fonts, colors } from '../../themes';
import MPTextInput from './../../components/textInput/index';
import { Button } from '../../components/button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styling'
import { CoreUserReducer } from '../../core/app_state/reducers/users';
import {Loader} from './../../components/Loader'

const Login = CoreUserReducer.loginUser
const getGehat = CoreUserReducer.getGehat
class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username : '',
      password : '',
      emailError : 'error is here ',
      passwordError : ' password is incorrect'
    };
    this.mLoginPresenter = new LoginPresenter(this);
  }
  componentDidMount() {
    // StatusBar.setBarStyle('dark-content', false);
  }
  render() {
    return (
      <KeyboardAwareScrollView>
      <View style={{ height: metrics.screenHeight - metrics.SOFT_MENU_BAR_HEIGHT, width: metrics.screenWidth }}>
        <SafeAreaView
          style={{ width: '100%', backgroundColor: '#fff' }}
        >
          <View style={{
            width: '100%',
            flexDirection: 'row',
          }}>
            <View style={{
              width: '50%',
            }}>
              <Image style={{
                height: metrics.screenWidth * .3,
                width: metrics.screenWidth * .3,
                margin: metrics.screenWidth * .05,
                resizeMode: 'contain'
              }} source={require('./../../images/army_logo.png')} />
            </View>
            <View style={{

              width: metrics.screenWidth,
              height: metrics.screenWidth,
              backgroundColor: '#A46B33',
              justifyContent: "flex-end",
              padding: metrics.screenWidth * .2,
              overflow: 'hidden',
              borderRadius: metrics.screenWidth * .5,
              marginTop: -metrics.screenWidth * .6,
              marginRight: -metrics.screenWidth * .4
            }} >
              <Text style={{ fontSize: fonts.size.h2, includeFontPadding: false, fontFamily: fonts.type.bold, textAlign: 'left', color: colors.white }}>MoD</Text>
            </View>
          </View>

          <View style={{marginHorizontal : metrics.screenWidth * .05,marginTop:metrics.screenHeight*.06}}>
            <Text style={{
              fontFamily: fonts.type.normal,
              fontSize: fonts.size.h2,
              width:'100%',
              textAlign:'center',
              includeFontPadding:false
            }}>تسجيل الدخول</Text>
            <View style={{ height: metrics.screenHeight*.03}}/>
            <MPTextInput
            keyboardType='phone-pad'
              Title={'رقم المحمول'}
              onChangeText={(text) => {
                this.setState({ username: text })
              }}
              icon={'ios-call'}
            />
            <View style={{ height: metrics.screenHeight*.05}}/>
            <MPTextInput
              Title={'كلمة المرور'}
              secure
              onChangeText={(text) => {
                this.setState({ password: text })
              }}
              icon={'ios-key'}
            />
            <Text style={{
              fontFamily: fonts.type.normal,
              fontSize: fonts.size.h5,
              includeFontPadding: false,
              color: colors.darkBlue
            }}>نسيت كلمة المرور</Text>

            <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
            <View style={{ height: metrics.screenHeight*.05}}/>
            <Button
              elevation={3}
              myWidth={metrics.screenWidth * 0.5}
              myHeight={metrics.screenHeight * 0.07}
              onClick={() => {
                // this.props.navigation.navigate('HomePage');
                this.mLoginPresenter.Login(this.state.username , this.state.password);
              }}
              backgroundColor={colors.accentColorExpert}
              headerName={'تسجيل دخول'}
                raduis={metrics.borderRadius}
              />
            <View style={{ height: metrics.screenHeight*.04}}/>
              <Button
                elevation={3}
                myWidth={metrics.screenWidth * 0.5}
                myHeight={metrics.screenHeight * 0.07}
                onClick={() => {
                  this.props.navigation.navigate('Register');
                  // this.mLoginPresenter.Login(this.state.username , this.state.password);
                }}
                backgroundColor={colors.blueX}
                headerName={'إنشاء حساب جديد'}
                raduis={metrics.borderRadius}
              />
            <View style={styles.navigationContainer}>
          
            </View>
            </View>
          </View>

        </SafeAreaView>
      </View>
      </KeyboardAwareScrollView>
    );
  }
}



function mapStateToProps(state) {
  return {
    LoginLoading: state.userReducer.LoginLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    Login: (message, responseHandler) => { dispatch(Login(message, responseHandler)) },
    getGehat: () => { dispatch(getGehat()) },
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginView);
