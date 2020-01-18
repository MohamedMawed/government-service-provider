import React, { Component } from 'react';
import { Image, Text, View, TouchableOpacity, StyleSheet, ScrollView, FlatList, SafeAreaView } from 'react-native';
import { metrics, fonts, colors } from './themes';
import { connect } from 'react-redux';
import { CoreUserReducer } from './core/app_state/reducers/users';
import { Requires } from './images/requires';
import Icon from 'react-native-vector-icons/Ionicons'; 
import Swiper from 'react-native-swiper'
import { Button } from './components/button';
import { CustomeAlert } from './components/CustomeAlert';
import { Setting } from '../settings';
const BackgroundColorPicker = (currentSelected, index) => {
  if (currentSelected == index)
    return colors.accentGreenExpert
  return colors.lightGray
}
const IconColor = (currentSelected, index) => {
  if (currentSelected == index)
    return colors.white
  return '#000000'
}

const EditOrder = CoreUserReducer.EditOrder;

const ServiceItem = ({ item, index, onClick }) => {
  
  return (
    <TouchableOpacity key={index} activeOpacity={.8} onPress={onClick} style={styles.button}>
      <Image style={{

        width: metrics.screenWidth * .2,
        height: metrics.screenWidth * .2,
        resizeMode: 'contain',
      }} source={{uri : 'http://104.198.161.68' + item.off_icon}} />
      <Text style={styles.buttonText}>
        {item.off_name}
      </Text>
    </TouchableOpacity>
  )
}


const OrderItem = ({ item, index, onClick }) => {

  let final = Requires['image' + item.id]
  return (
    <View style={{
      padding: 5,
      width: metrics.screenWidth * .9,
      margin: 10,
      height: metrics.screenHeight * .2,
      backgroundColor: colors.white,
      borderRadius: metrics.borderRadius,
      elevation: 2,
    }}>
      <View style={{ width: '100%', height: '20%', justifyContent: 'space-between', flexDirection: 'row' }}>
        <View style={{
          width: 30,
          height: 30,
          padding: 5,
          backgroundColor: colors.lightGray,
          borderRadius: 15,
          elevation: 2,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Icon name={'ios-close'} size={25} color={colors.black} />

        </View>
        <Text style={{
          fontSize: fonts.size.h5,
          color: colors.black,
          textAlign: 'center',
          fontFamily: fonts.type.normal,
          includeFontPadding: false,
        }}>
          إستخراج صورة قيد الميلاد
          </Text>
      </View>
      <View style={{ width: '100%', height: '20%', justifyContent: 'flex-end', flexDirection: 'row' }}>
        <Text style={{
          fontSize: fonts.size.h5,
          color: colors.red,
          textAlign: 'center',
          fontFamily: fonts.type.normal,
          includeFontPadding: false,
        }}>
          خلال 3 ايام عمل
          </Text>
        <Text style={{
          fontSize: fonts.size.h6,
          color: colors.black,
          textAlign: 'center',
          fontFamily: fonts.type.bold,
          includeFontPadding: false,
        }}>
         {'ميعاد الإستلام :-'}
          </Text>

      </View>


      <View style={{ width: '100%', height: '20%', justifyContent: 'flex-end', flexDirection: 'row' }}>
        <Text style={{
          fontSize: fonts.size.h5,
          color: colors.red,
          textAlign: 'center',
          fontFamily: fonts.type.normal,
          includeFontPadding: false,
        }}>
          عند الإستلام
          </Text>
        <Text style={{
          fontSize: fonts.size.h6,
          color: colors.black,
          textAlign: 'center',
          fontFamily: fonts.type.bold,
          includeFontPadding: false,
        }}>
         {'الدفع :-'}
          </Text>

      </View>

      <View style={{ width: '100%', height: '20%', justifyContent: 'flex-end', flexDirection: 'row' }}>
        <Text style={{
          fontSize: fonts.size.h5,
          color: colors.red,
          textAlign: 'center',
          fontFamily: fonts.type.normal,
          includeFontPadding: false,
        }}>
          قيد العمل
          </Text>
        <Text style={{
          fontSize: fonts.size.h6,
          color: colors.black,
          textAlign: 'center',
          fontFamily: fonts.type.bold,
          includeFontPadding: false,
        }}>
         {'الحالة :-'}
          </Text>

      </View>
      
    </View>
  )
}
class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      services: [],
      tabSelected: 0,
      showAlert:true,
      currentSelected : 0,
      geha : {
        geha_id : 0,
        off_name : 'لا يوجد',
        
      }
    }
  }
  render() {
    return (
      <SafeAreaView style={{
        width:'100%',
        height:'100%'
      }}>
          <View style={{
            width: 60,
            height: 60,
            position: 'absolute',
            borderColor: 'white',
            zIndex:5,
            borderRadius: metrics.screenWidth * .3,
            borderWidth: 1,
            bottom: -metrics.screenHeight * 0.045,
          }}>
            <Image style={{

              width: '100%',
              height: '100%',
              resizeMode: 'contain'
            }} source={require('./images/7.png')} />
          </View>
          <ScrollView style={{ width: '100%', height: metrics.screenHeight * .91, paddingBottom: metrics.SOFT_MENU_BAR_HEIGHT }}>

            <FlatList
              numColumns={2}
              contentContainerStyle={{ justifyContent: 'space-between', alignItems: 'center' }}
              data={this.props.offices}
              extraData={this.props.offices}
              renderItem={({ item, index }) => {
                return (
                  <ServiceItem onClick={() => {
                    this.props.EditOrder({ office: item.off_id });
                    this.props.navigation.navigate('ServiceDetails', { off: item , geha_id : this.state.geha.geha_id })
                  }} item={item} index={index} />
                )
              }}
            />

          </ScrollView>

        
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: metrics.screenHeight * .07,
    backgroundColor: '#F44336',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: metrics.screenWidth * .02,

  },
  button: {
    justifyContent: 'space-evenly',
    margin: 10,
    borderRadius: metrics.borderRadius,
    backgroundColor: colors.lightGray,
    height: metrics.screenWidth * .38,
    width: metrics.screenWidth * .38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    width: '100%',
    textAlign: 'center',
    includeFontPadding: false,
    fontSize: fonts.size.h5,
    fontFamily: fonts.type.normal,
    color: colors.black
  },
  buttonContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: metrics.screenHeight * .05,
    marginBottom: metrics.screenHeight * .05
  },
  container: {
    marginTop: 30,
    height: 40,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 25,
    marginLeft: 10,
    borderWidth: 2,
    borderColor: '#BDBDBD'
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
  }
})


function mapStateToProps(state) {
  return {
    offices: state.userReducer.offices,
    gehat: state.userReducer.gehat,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    EditOrder: (attribute) => dispatch(EditOrder(attribute)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
