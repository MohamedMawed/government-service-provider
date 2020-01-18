import ImageResizer from 'react-native-image-resizer';
import { StackActions, NavigationActions } from 'react-navigation';
import { PermissionsAndroid, Keyboard } from 'react-native';
import { Setting } from '../../../../Setting';
import * as Analitycs from '../../../core/services/Analitycs';

export default class VerificationPresenter {
  constructor(VerificationView) {
    this.VerificationView = VerificationView;
    this.RegisterMode = VerificationView.props.navigation.getParam(
      'RegisterMode',
      false
    );
    this.ChangeEmailMode = VerificationView.props.navigation.getParam(
      'ChangeEmailMode',
      false
    );
    this.ChangePhoneMode = VerificationView.props.navigation.getParam(
      'ChangePhoneMode',
      false
    );
  }
  Verifiy = () => {
    // console.log('press Verifiy', this.VerificationView.state.timePassed);
    if (this.VerificationView.state.timePassed === false) {
      this.VerificationView.setState({ timePassed: !this.VerificationView.state.timePassed }, () => {
        console.log('setState Verifiy', this.VerificationView.state.timePassed);
      });
      console.log('Verifiy');

      setTimeout(() => {
        this.VerificationView.setState({ timePassed: false });
        console.log('resertBTN');
      }, 1000);
      if (this.RegisterMode) {
        this.handleRegister();
        return;
      }
      if (this.ChangeEmailMode) {
        this.handleChangeEmail();
        return;
      }
      if (this.ChangePhoneMode) {
        this.handleChangePhone();
        return;
      }
      let responseHandler = {
        onSuccess: () => {
          Analitycs.setEvent('Sign in without facebook');
          this.VerificationView.props.getUpcomingOrder();
          this.VerificationView.props.getChannel({
            onSuccess: channel => {
              global.joinSocketChannel(channel);
            }
          });
          let AddressListresponseHandler = {
            onSuccess: data => {
              console.log('tagggHi');
              if (data.length)
                for (let i = 0; i < data.length; i++) {
                  if (data[i].default_address == true)
                    this.VerificationView.props.editOrder({
                      selectedAddressIndex: i
                    });
                }
              const resetAction = StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({
                    routeName: 'locationVerfication',
                    params: { navigateTo: data.length ? 'Home' : 'AddAddress' }
                  })
                ]
              });
              this.VerificationView.props.navigation.dispatch(resetAction);
            }
          };
          this.VerificationView.props.getAddressList(
            AddressListresponseHandler
          );
        },
        onFail: error => {
          this.displayError(error);
        }
      };
      loginData = {
        phone: this.VerificationView.props.phone,
        verification_code: this.VerificationView.state.enterdVerifyNum
      };
      this.VerificationView.props.loginUser(loginData, responseHandler);
    }

  };

  getUserFullData = () => {};

  // async requestSMSPermission() {
  //   try {
  //     var granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.READ_SMS,
  //       {
  //         title: 'read SMS',
  //         message: 'need access to read sms, to verify'
  //       }
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
  //         {
  //           title: 'Receive SMS',
  //           message: 'Need access to receive sms, to verify OTP'
  //         }
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         SmsListener.addListener(message => {
  //           let verificationCodeRegex = /This is your Reme code: ([\d]{5})/;
  //           if (verificationCodeRegex.test(message.body)) {
  //             let verificationCode = message.body.match(
  //               verificationCodeRegex
  //             )[1];
  //             this.VerificationView.setState({
  //               enterdVerifyNum: verificationCode
  //             });
  //             Keyboard.dismiss();
  //             this.Verifiy();
  //           }
  //         });
  //       } else {
  //       }
  //     } else {
  //     }
  //   } catch (err) {}
  // }
  UploadImage = () => {
    x = this.VerificationView.props.navigation.getParam('Image', null);
    if (x == null) {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'locationVerfication',
            params: { navigateTo: 'AddAddress' }
          })
        ]
      });
      this.VerificationView.props.navigation.dispatch(resetAction);
      return;
    }

    ImageResizer.createResizedImage(x.uri, 300, 300, 'PNG', 30, 0).then(RES => {
      let requestBody = new FormData();
      let temp = {};
      temp.type = 'image/jpeg';
      temp.name = 'coverPhoto.jpg';
      temp.uri = RES.uri;
      requestBody.append('image', temp);
      var xhr = new XMLHttpRequest();
      xhr.open('POST', Setting.baseURL + '/consumer/avatar');
      xhr.setRequestHeader(
        'X-Authorization',
        'Bearer ' + this.VerificationView.props.profile.token
      );
      xhr.send(requestBody);
      xhr.onreadystatechange = e => {
        if (xhr.readyState !== 4) {
          return;
        }
        if (xhr.status != 200) {
          global.openToast("can't upload profile picture.");
        }
        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: 'locationVerfication',
              params: { navigateTo: 'AddAddress' }
            })
          ]
        });
        this.VerificationView.props.navigation.dispatch(resetAction);
      };
    });
  };
  handleRegister = () => {
    let responseHandler = {
      onSuccess: () => {
        Analitycs.setEvent('Registered without facebook');
        this.UploadImage();
      },
      onFail: error => {
        this.displayError(error);
      }
    };
    let responseHandler2 = {
      onSuccess: () => {
        Analitycs.setEvent('Registered with facebook');
        this.UploadImage();
      },
      onFail: error => {
        this.displayError(error);
      }
    };
    let RegisterData = this.VerificationView.props.RegisterData;
    RegisterData.verification_code = this.VerificationView.state.enterdVerifyNum;
    if (this.VerificationView.props.navigation.getParam('facebook', false))
      this.VerificationView.props.registerFacebookUser(
        RegisterData,
        responseHandler2
      );
    else
      this.VerificationView.props.registerUser(RegisterData, responseHandler);
  };
  handleChangeEmail = () => {
    let responseHandler = {
      onSuccess: () => {
        this.VerificationView.props.navigation.navigate('ProfileView');
      },
      onFail: error => {
        this.displayError(error);
      }
    };
    let NewEmail = this.VerificationView.props.navigation.getParam(
      'newEmail',
      null
    );
    let Phone = this.VerificationView.props.navigation.getParam(
      'phoneNum',
      null
    );
    let ChangeEmailData = {
      email: NewEmail,
      phone: Phone,
      verification_code: this.VerificationView.state.enterdVerifyNum
    };
    this.VerificationView.props.UpdateConsumerPreferences(
      ChangeEmailData,
      responseHandler
    );
  };

  handleChangePhone = () => {
    let responseHandler = {
      onSuccess: () => {
        this.VerificationView.props.navigation.navigate('ProfileView');
      },
      onFail: error => {
        this.displayError(error);
      }
    };
    let Phone = this.VerificationView.state.Phone;
    let UpdatedData = {
      phone: Phone,
      verification_code: this.VerificationView.state.enterdVerifyNum
    };
    this.VerificationView.props.ChangePhone(UpdatedData, responseHandler);
  };

  isLoading = () => {
    return (
      (this.RegisterMode && this.VerificationView.props.RegisterLoading) ||
      (!this.RegisterMode && this.VerificationView.props.LoginLoading)
    );
  };
  getformattedPhone = () => {
    let x = this.getPhone();
    let formattedPhone =
      x.substring(0, 2) +
      ' (' +
      x.substring(2, 5) +
      ') ' +
      x.substring(5, 8) +
      '-' +
      x.substring(8);
    return formattedPhone;
  };
  getPhone = () => {
    if (this.RegisterMode) {
      return this.VerificationView.props.RegisterData.phone;
    } else if (this.ChangeEmailMode || this.ChangePhoneMode) {
      return this.VerificationView.state.Phone;
    } else {
      return this.VerificationView.props.phone;
    }
  };
  onchangeCode = verifyNum => {
    this.VerificationView.setState({ enterdVerifyNum: verifyNum }, () => {
      if (this.VerificationView.state.enterdVerifyNum.length === 5) {
        Keyboard.dismiss();
        this.Verifiy();
      }
    });
  };
  resendCode = () => {
    responseHandler = {
      onSuccess: () => {},
      onFail: () => {
        global.openToast("can't send code right now , please try again later.");
      }
    };

    if (this.VerificationView.state.resendNum >= 1) {
      global.openToast(
        `Your code have been sent please wait ${
          this.VerificationView.state.time
        } sec`
      );
      return;
    }
    this.VerificationView.setState({ resendNum: 1 });
    let phone = this.VerificationView.props.phone;
    if (this.RegisterMode) {
      this.VerificationView.props.sendVerificationCode(phone, responseHandler);
    } else {
      this.VerificationView.props.sendLoginVerificationCode(
        phone,
        responseHandler
      );
    }
  };

  displayError = error => {
    let errorMassage = error.errors ? error.errors[0].message : error;
    if (errorMassage == 'This value should not be blank') {
      global.openToast('You should enter the verification code');
    } else if (
      errorMassage ==
      'This value is too short. It should have 5 characters or more.'
    ) {
      global.openToast('It should be 5 numbers');
    } else if (error.message) {
      global.openToast(error.message);
    } else {
      global.openToast(error);
    }
  };
}
