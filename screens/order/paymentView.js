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
import { PaymentPresenter } from './orderPresenter';
import { Width, Height } from '../../constant/dimention';
import { metrics, fonts, colors } from '../../themes';
import MPTextInput from '../../components/textInput/index';
import { Button } from '../../components/button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styling'
import { CoreUserReducer } from '../../core/app_state/reducers/users';
import { Loader } from '../../components/Loader'
import CheckBox from './checkBox'
import { GooglePay } from 'react-native-google-pay';
// const Login = CoreUserReducer.loginUser
const SendOrder = CoreUserReducer.SendOrder

const allowedCardNetworks = ['VISA', 'MASTERCARD'];
const allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];

const requestData = {
  cardPaymentMethod: {
    tokenizationSpecification: {
      type: 'PAYMENT_GATEWAY',
      // stripe (see Example):
      gateway: 'example',
      gatewayMerchantId: '140135223',
      // other:
    },
    allowedCardNetworks,
    allowedCardAuthMethods,
  },
  transaction: {
    totalPrice: '10',
    totalPriceStatus: 'FINAL',
    currencyCode: 'EGP',
  },
  merchantName: 'Mohamed Mawed',
};/* 
const paymentRequest = {
  cardPaymentMethodMap: {
   gateway: {
     name: '', // Identify your gateway and your app's
     merchantId: '',  // YOUR_GATEWAY_MERCHANT_ID
     clientKey: 'sandbox_XXXXXXXXXXXXndxm44jw',
     sdkVersion: 'client.VERSION'
   },
   cardNetworks
  },
  transaction: {
   totalPrice: '50',
   totalPriceStatus: 'FINAL', // PAYMENT AMOUNT STATUS 
   currencyCode: 'EGP' // CURRENCY CODE
  },
  merchantName: 'Mohamed Mawed'  // MERCHANT NAME Information about the merchant requesting payment information
  } */
class PaymentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      emailError: 'error is here ',
      passwordError: ' password is incorrect',


      payVisa : true,
    };
    this.mPaymentPresenter = new PaymentPresenter(this);
  }
  componentDidMount() {
    StatusBar.setBarStyle('dark-content', false);

  }
  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={{  width: metrics.screenWidth }}>
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
                }} source={require('./../../images/7.png')} />
              </View>
              <View style={{

                width: metrics.screenWidth,
                height: metrics.screenWidth,
                backgroundColor: 'red',
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

            <View style={{ marginHorizontal: metrics.screenWidth * .05, marginTop: metrics.screenHeight * .06 }}>
              <Text style={{
                fontFamily: fonts.type.normal,
                fontSize: fonts.size.h2,
                width: '100%',
                textAlign: 'center',
                includeFontPadding: false
              }}>وسيلة الدفع</Text>
              <View style={{ height: metrics.screenHeight * .02 }} />


                <CheckBox
                  onCheck={() => {
                    this.setState({ payVisa: true });
                  }}
                  text="الدفع ببطاقة الإئتمان"
                  Selected={ this.state.payVisa == true}
                />
              <View style={{ height: metrics.screenHeight * .015 }} />
{/* 
              <MPTextInput
                Title={'مالك البطاقة'}
                onChangeText={(text) => {
                  this.setState({ username: text })
                }}
                icon={'ios-person'}
              />
              <View style={{ height: metrics.screenHeight * .02 }} />

              <View style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent:'space-between'
              }}>
                <View style={{
                  width: '40%'
                }}>
                  <MPTextInput
                    Title={'تاريخ الإنتهاء'}
                    onChangeText={(text) => {
                      this.setState({ password: text })
                    }}
                  />
                </View>

                <View style={{
                  width: '40%'
                }}>
                  <MPTextInput
                    Title={'رمز الأمان'}
                    onChangeText={(text) => {
                      this.setState({ password: text })
                    }}
                  />
                </View>
              </View>
              <View style={{ height: metrics.screenHeight * .02 }} />
              <MPTextInput
                Title={'رقم بطاقة الإئتمان'}
                onChangeText={(text) => {
                  this.setState({ password: text })
                }}
                icon={'ios-card'}
              /> */}
              <View style={{ height: metrics.screenHeight * .02 }} />
              <CheckBox
                onCheck={() => {
                  this.setState({ payVisa: false });
                }}
                text="الدفع عند الإستلام"
                Selected={this.state.payVisa == false}
              />
              <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ height: metrics.screenHeight * .05 }} />
                <Button
                  elevation={3}
                  myWidth={metrics.screenWidth * 0.5}
                  myHeight={metrics.screenHeight * 0.07}
                  onClick={() => {

                    order = {
                                
                      "off_id" : this.props.office,
                      "srv_id" : this.props.service,
                      "ord_payment" : this.state.payVisa ? 'visa card' : 'cash on delivery',
                    }
                    let responseHandler = {
                      onSuccess: () => {
                
                      },
                      onFail: (error) => {
                        console.log(error)
                      }
                  }
                    this.props.SendOrder(order ,responseHandler )
                    this.props.navigation.navigate('HomePage')

                    GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST);

                    // Check if Google Pay is available
                    // GooglePay.isReadyToPay(allowedCardNetworks, allowedCardAuthMethods)
                    //   .then((ready) => {
                    //     if (ready) {
                    //       // Request payment token
                    //       GooglePay.requestPayment(requestData)
                    //         .then((token) => {


                    //         })
                    //         .catch((error) => console.log(error.code, error.message));
                    //     }
                    //   })
                  }}
                  backgroundColor={colors.accentColorExpert}
                  headerName={'إرسال الطلب'}
                  raduis={metrics.borderRadius}
                />
                <View style={styles.navigationContainer}>

                </View>
              </View>
            </View>




            {this.props.LoginLoading ? <Loader /> : null}
          </SafeAreaView>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}



function mapStateToProps(state) {
  return {
    // LoginLoading: state.userReducer.LoginLoading,
    office : state.userReducer.office,
    service : state.userReducer.service,
    requiredFieldsAnswers : state.userReducer.requiredFieldsAnswers,
    geha_id : state.userReducer.geha_id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // Login: (message, responseHandler) => { dispatch(Login(message, responseHandler)) },
     SendOrder: (order , responseHandler) => { dispatch(SendOrder(order , responseHandler)) },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentView);
