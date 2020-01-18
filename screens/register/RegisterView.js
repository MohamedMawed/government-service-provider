import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import RegisterPresenter from './RegisterPresenter';
import { Width, Height } from '../../constant/dimention';
import { metrics, fonts, colors } from '../../themes';
import MPTextInput from '../../components/textInput/index';
import { Button } from '../../components/button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { CoreUserReducer } from '../../core/app_state/reducers/users';
import { Loader } from '../../components/Loader';
const Register = CoreUserReducer.registerUser
class RegisterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      mobile: '',
      password: '',
      confirmPass: '',
      nationalNumber: '',
      postalCode: '',
      emailError: 'error is here ',
      passwordError: ' password is incorrect'
    };
    this.mRegisterPresenter = new RegisterPresenter(this);
  }
  componentDidMount() {
    StatusBar.setBarStyle('dark-content', false);
  }
  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={{ width: metrics.screenWidth }}>
          <ScrollView
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
                backgroundColor: '#3E3439',
                justifyContent: "flex-end",
                padding: metrics.screenWidth * .2,
                overflow: 'hidden',
                borderRadius: metrics.screenWidth * .5,
                marginTop: -metrics.screenWidth * .6,
                marginRight: -metrics.screenWidth * .4
              }} >
                <Text style={{ fontSize: fonts.size.h2, includeFontPadding: false, fontFamily: fonts.type.bold, textAlign: 'left', color: colors.white }}>MP</Text>
              </View>
            </View>

            <View style={{ marginHorizontal: metrics.screenWidth * .05, marginTop: metrics.screenHeight * .04, justifyContent: 'center' ,height : metrics.screenHeight*.8}}>
              <Text style={{
                fontFamily: fonts.type.normal,
                fontSize: fonts.size.h2,
                width: '100%',
                textAlign: 'center',
                includeFontPadding: false
              }}>تسجيل حساب جديد</Text>
              <MPTextInput
                Title={'الإسم الرباعى'}
                onChangeText={(text) => {
                  this.setState({ username: text })
                }}
                icon={'ios-person'}
              />
              <View style={{ height: metrics.screenHeight * .02 }} />
              <MPTextInput
                Title={'رقم المحمول'}
                keyboardType='phone-pad'
                onChangeText={(text) => {
                  this.setState({ mobile: text })
                }}
                icon={'ios-call'}
              />
              <View style={{ height: metrics.screenHeight * .02 }} />
              <MPTextInput
                Title={'البريد الإلكترونى'}
                onChangeText={(text) => {
                  this.setState({ email: text })
                }}
                icon={'ios-mail'}
              />
              <View style={{ height: metrics.screenHeight * .02 }} />
              <MPTextInput
                Title={'كلمة المرور'}
                secure
                onChangeText={(text) => {
                  this.setState({ password: text })
                }}
                icon={'ios-key'}
              />
              <View style={{ height: metrics.screenHeight * .02 }} />

              <MPTextInput
                Title={'تأكيد كلمة المرور'}
                secure
                onChangeText={(text) => {
                  this.setState({ confirmPass: text })
                }}
                icon={'ios-key'}
              />
              <View style={{ height: metrics.screenHeight * .02 }} />
              <MPTextInput
                Title={'الرقم القومى'}
                keyboardType='phone-pad'
                onChangeText={(text) => {
                  this.setState({ nationalNumber: text })
                }}
                icon={'ios-card'}
              />
              <View style={{ height: metrics.screenHeight * .02 }} />
              <MPTextInput
                Title={'الرمز البريدي'}
                keyboardType='phone-pad'
                onChangeText={(text) => {
                  this.setState({ postalCode: text })
                }}
                icon={'ios-home'}
              />
              <View style={{ height: metrics.screenHeight * .03 }} />

              <View style={{ width: '100%', justifyContent: 'center' ,height : metrics.screenHeight * 0.07, alignItems: 'center' }}>
                <Button
                  elevation={3}
                  myWidth={metrics.screenWidth * 0.4}
                  myHeight={metrics.screenHeight * 0.07}
                  onClick={() => {
                    this.mRegisterPresenter.register();
                    // this.props.navigation.navigate('HomePage');
                  }}
                  backgroundColor={colors.accentColorExpert}
                  headerName={'سجل الان'}
                  raduis={metrics.borderRadius}
                />
              </View>
            </View>

          </ScrollView>
        </View>
        {this.props.RegisterLoading ? <Loader /> : null}
      </KeyboardAwareScrollView>
    );
  }
}



function mapStateToProps(state) {
  return {
    RegisterLoading: state.userReducer.RegisterLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    Register: (message, responseHandler) => { dispatch(Register(message, responseHandler)) },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);
