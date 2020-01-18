import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import { OrderPresenter } from './orderPresenter';
import { Width, Height } from '../../constant/dimention';
import { metrics, fonts, colors } from '../../themes';
import MPTextInput from '../../components/textInput/index';
import { Button } from '../../components/button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styling'
import { CoreUserReducer } from '../../core/app_state/reducers/users';
import { Loader } from '../../components/Loader'
import { CustomeAlert } from '../../components/CustomeAlert';
import ImageBox from './imageBox';



const PlaceItem = ({item , index ,onClick })=>{
  console.log('my Itemmmm',item)
  
  return (
    <TouchableOpacity onPress={onClick} style={{
      width: metrics.screenWidth*.9,
      height: metrics.screenHeight * .07,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Text style={{
        fontFamily: fonts.type.normal,
        fontSize: fonts.size.h5,
        width: metrics.screenWidth*.9,
        textAlign: 'center',
      includeFontPadding: false,
        color : colors.black
      }}>{item.place_name}</Text>
      <View style={{ width: '100%', height: 1.5, backgroundColor: colors.bgExpert,position:"absolute",bottom:0 }} />
    </TouchableOpacity>
  )
}
// const Login = CoreUserReducer.loginUser
const EditOrder = CoreUserReducer.EditOrder
const getServicesParams = CoreUserReducer.getServicesParams
const getServicesAddons = CoreUserReducer.getServicesAddons
class OrderView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      ServicesAddons:[],
      AvailablePlaces : [],
      place : {
        place_name : "إختار مكان الإستلام"
      },
      SubServicesParams: [],
      emailError: 'error is here ',
      myIndex: props.navigation.getParam('subServiceId', 0)
    };
    this.mOrderPresenter = new OrderPresenter(this);
  }
  componentDidMount() {
    StatusBar.setBarStyle('dark-content', false);
  }
  render() {
    return (
        <View style={{  width: metrics.screenWidth }}>
        <KeyboardAwareScrollView>
          <SafeAreaView
            style={{ width: '100%',  backgroundColor: '#fff', }}
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
              }}>البيانات الشخصية</Text>
              <View style={{ height: metrics.screenHeight * .02 }} />

              <FlatList
                contentContainerStyle={{ justifyContent: 'space-between', width: '100%', alignItems: 'space-between' }}
                data={this.state.ServicesParams}
                ItemSeparatorComponent={()=> <View style={{ height: metrics.screenHeight * .03 }} />}
                extraData={this.state.ServicesParams}
                renderItem={({ item, index }) => {
                  return (
                    <MPTextInput
                      Title={item.parm_name}
                      onChangeText={(text) => {
                        this.setState({ ['parm'+item.parm_id]: text })
                      }}
                      icon={item.parm_icon_name}
                    />
                  )
                }}
              />
              <View style={{ height: metrics.screenHeight * .015 }} />


              <FlatList
                contentContainerStyle={{ justifyContent: 'space-between', width: '100%', alignItems: 'space-between' }}
                data={this.state.ServicesAddons}
                ItemSeparatorComponent={() => <View style={{ height: metrics.screenHeight * .01 }} />}
                extraData={this.state.ServicesParams}
                renderItem={({ item, index }) => {
                  return (
                    <ImageBox key={item.addon_id}  name={item.addon_name} />
                  )
                }}
              />

              
              <View style={{ height: metrics.screenHeight * .03 }} />
              <Text style={{
                fontFamily: fonts.type.normal,
                fontSize: fonts.size.h2,
                width: '100%',
                textAlign: 'center',
                includeFontPadding: false
              }}>مكان الإستلام</Text>
              <View style={{ height: metrics.screenHeight * .02 }} />
              <Button
                myWidth={'100%'}
                myHeight={metrics.screenHeight * 0.07}
                onClick={() => {
                    this.setState({showAlert : true})
                }}
                backgroundColor={colors.whiteGray}
                headerName={this.state.place.place_name}
                raduis={metrics.borderRadius}
              />

              <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ height: metrics.screenHeight * .05 }} />
                <Button
                  elevation={3}
                  myWidth={metrics.screenWidth * 0.7}
                  myHeight={metrics.screenHeight * 0.07}
                  onClick={() => {
                    var requiredParamsAnswers = ""
                    try {
                      this.state.ServicesParams.forEach(element => {
                        console.log(element)
                        if(this.state['parm'+element.parm_id] && this.state['parm'+element.parm_id].length > 0 ){

                        }else {
                          requiredParamsAnswers = final
                        }
                      });


                      this.state.ServicesParams.forEach(element => {
                        console.log(element)
                        if(this.state['parm'+element.parm_id] && this.state['parm'+element.parm_id].length > 0 ){

                        }else {
                          requiredParamsAnswers = final
                        }
                      });


                      if(!this.state.place.place_id)requiredParamsAnswers = final
                      this.props.EditOrder({ requiredFieldsAnswers: requiredParamsAnswers })
                      this.props.navigation.navigate('PaymentPage');
                    }
                    catch (err) {
                      global.openToast('برجاء إكمال المعلومات المطلوبة')

                    }


                    // this.mLoginPresenter.Login(this.state.username, this.state.password);
                  }}
                  backgroundColor={colors.accentColorExpert}
                  headerName={'الذهاب إلي وسيلة الدفع'}
                  raduis={metrics.borderRadius}
                />
                <View style={styles.navigationContainer}>

                </View>
              </View>
            </View>




            {this.props.LoginLoading ? <Loader /> : null}

          </SafeAreaView>

      </KeyboardAwareScrollView>
      {this.state.showAlert ?  <CustomeAlert
          CloseAlert={() => {
            this.setState({ showAlert: false });
          }}
          AlertWidth={0.9}
          AlertHeight={this.state.AvailablePlaces.length*.074 }
          AlertPosition='center'
          borderRadius={7}
          AlertOpen={this.state.showAlert}
        >
            <FlatList
              contentContainerStyle={{ justifyContent: 'space-between', alignItems: 'center' }}
              data={this.state.AvailablePlaces}
              extraData={this.state.AvailablePlaces}
              renderItem={({ item, index }) => {
                return (
                  <PlaceItem onClick={() => {
                    this.props.EditOrder({ place_id: item.place_id });
                    this.setState({ showAlert: false , place : item });
                  }} item={item} selected={this.state.place.place_id == item.place_id} index={index} />
                )
              }}
            />

            </CustomeAlert> : null}
      </View>
    );
  }
}



function mapStateToProps(state) {
  return {
    // LoginLoading: state.userReducer.LoginLoading,
    office : state.userReducer.office,
    
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // Login: (message, responseHandler) => { dispatch(Login(message, responseHandler)) },
    getServicesParams: (id, responseHandler) => dispatch(getServicesParams(id, responseHandler)),
    getServicesAddons: (id, responseHandler) => dispatch(getServicesAddons(id, responseHandler)),
    EditOrder: (attribute) => dispatch(EditOrder(attribute))

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderView);
