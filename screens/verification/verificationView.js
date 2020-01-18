import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';

import styles from './verificationStyling';
import { Width, Height } from '../../../constant/dimention';
import { HeaderWithBack } from '../../../component/header/header';
import { ButtonGradient } from '../../../component/button';
import { colors, metrics } from '../../../themes';
import { DashedTextInput } from '../../../component/DashedTextInput';
import { CoreUserReducer } from '../../../core/app_state/reducers/users';
import { CoreOrderReducer } from '../../../core/app_state/reducers/order';
import VerificationPresenter from './verificationPresenter';

const editOrder = CoreOrderReducer.editOrder;
const sendVerificationCode = CoreUserReducer.sendVerificationCode;
const registerUser = CoreUserReducer.registerUser;
const loginUser = CoreUserReducer.loginUser;
const sendLoginVerificationCode = CoreUserReducer.sendLoginVerificationCode;
const getChannel = CoreUserReducer.getSocketChannel;
const UpdateConsumerPreferences = CoreUserReducer.UpdateConsumerPreferences;
const ChangePhone = CoreUserReducer.ChangePhone;
const getUpcomingOrder = CoreOrderReducer.getUpcomingOrder;
const getAddressList = CoreUserReducer.getAddressList;
const registerFacebookUser = CoreUserReducer.registerFacebookUser;
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
class VerificationView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Focused: true,
      enterdVerifyNum: '',
      Phone: this.props.navigation.getParam('phoneNum', null),
      resendNum: 0,
      time: 60,
      timePassed: false
    };
    this.mVerificationPresenter = new VerificationPresenter(this);
  }
  componentDidMount() {
    // this.mVerificationPresenter.requestSMSPermission();
    setInterval(() => {
      if (this.state.time === 0) {
        this.setState({ time: 60, resendNum: 0 });
      } else {
        this.setState(PrevState => {
          return {
            time: PrevState.time - 1
          };
        });
      }
    }, 1500);
  }
  render() {
    return (
      <DismissKeyboard>
        <View style={styles.container}>
          <HeaderWithBack
            backHandler={() => {
              this.props.navigation.goBack();
            }}
            HeaderName={'Verify Number'}
          />

          <View style={styles.descirptionContainer}>
            <Text style={styles.descirptionText}>
              A verification code has been sent to the number below.
            </Text>
          </View>

          <View style={styles.phoneNumContainer}>
            <Text style={styles.phoneNumText}>
              {this.mVerificationPresenter.getformattedPhone()}
            </Text>
          </View>

          <TextInput
            keyboardType={'numeric'}
            style={{
              position: 'absolute',
              opacity: 0,
              bottom: -100,
              color: colors.white
            }}
            autoFocus={this.state.Focused}
            selectionColor={'transparent'}
            maxLength={5}
            ref={'textinput'}
            onSubmitEditing={this.mVerificationPresenter.Verifiy}
            onChangeText={this.mVerificationPresenter.onchangeCode}
          />

          <DashedTextInput
            myonPress={() => {
              Keyboard.dismiss();
              setTimeout(() => this.refs.textinput.focus(), 150);
            }}
            myNumber={this.state.enterdVerifyNum}
          />

          <TouchableOpacity
            onPress={() => {
              this.mVerificationPresenter.resendCode();
            }}
          >
            <Text style={styles.navigationText}>Resend Code</Text>
          </TouchableOpacity>

          <View style={styles.verifyContainer}>
            <ButtonGradient
              colors={colors.gradientYellowToOrange}
              onClick={this.mVerificationPresenter.Verifiy}
              headerName={'Verify'}
              backgroundColor={colors.white}
              myWidth={Width * 0.9}
              raduis={metrics.borderRadius}
              loading={this.mVerificationPresenter.isLoading()}
              myHeight={Height * 0.08}
            />
          </View>
        </View>
      </DismissKeyboard>
    );
  }
}

function mapStateToProps(state) {
  return {
    LoginLoading: state.userReducer.LoginLoading,
    phone: state.userReducer.phone,
    RegisterLoading: state.userReducer.RegisterLoading,
    RegisterData: state.userReducer.RegisterData,
    profile: state.userReducer.profile
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAddressList: responseHandler =>
      dispatch(getAddressList(responseHandler)),
    getUpcomingOrder: () => {
      dispatch(getUpcomingOrder());
    },
    loginUser: (loginData, responseHandler) => {
      dispatch(loginUser(loginData, responseHandler));
    },
    sendVerificationCode: (phone, responseHandler) => {
      dispatch(sendVerificationCode(phone, responseHandler));
    },
    sendLoginVerificationCode: (phone, responseHandler) => {
      dispatch(sendLoginVerificationCode(phone, responseHandler));
    },
    registerUser: (registerData, responseHandler) => {
      dispatch(registerUser(registerData, responseHandler));
    },
    getChannel: responseHandler => {
      dispatch(getChannel(responseHandler));
    },
    UpdateConsumerPreferences: (UpdatedData, responseHandler) => {
      dispatch(UpdateConsumerPreferences(UpdatedData, responseHandler));
    },
    ChangePhone: (UpdatedData, responseHandler) => {
      dispatch(ChangePhone(UpdatedData, responseHandler));
    },
    registerFacebookUser: (registerData, responseHandler) => {
      dispatch(registerFacebookUser(registerData, responseHandler));
    },
    editOrder: data => {
      dispatch(editOrder(data));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerificationView);
