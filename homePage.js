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
const getGehat = CoreUserReducer.getGehat

const GehaItem = ({ item, index, onClick }) => {
  console.log('http://34.69.68.169' + item.off_icon)
  return (
    <TouchableOpacity key={index} activeOpacity={.8} onPress={onClick} style={styles.button}>
      <Image style={{

        width: metrics.screenWidth * .2,
        height: metrics.screenWidth * .2,
        resizeMode: 'contain'
      }} source={{ uri:'http://34.69.68.169:80' + item.off_icon }} />
      <Text style={styles.buttonText}>
        {item.off_name}
      </Text>
    </TouchableOpacity>
  )
}


class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      services: [],
      tabSelected: 0,
      showAlert: true,
      currentSelected: 0,
      refreshing : false,
      geha: {
        geha_id: 0,
        off_name: 'لا يوجد',

      }
    }
  }
  render() {
    return (
      <SafeAreaView style={{
        width: '100%',
        height: '100%',
        backgroundColor : colors.lightGray
      }}>
        <View style={{
          width: 60,
          height: 60,
          position: 'absolute',
          borderColor: 'white',
          zIndex: 5,
          borderRadius: metrics.screenWidth * .3,
          borderWidth: 1,
          bottom: -metrics.screenHeight * 0.045,
        }}>
        </View>
        <ScrollView style={{ width: '100%', height: metrics.screenHeight * .91, paddingBottom: metrics.SOFT_MENU_BAR_HEIGHT }}>

          <FlatList
            numColumns={2}
            contentContainerStyle={{height:metrics.screenHeight * .91, alignItems: 'center' }}
            data={this.props.filterValue.length > 0   ? this.props.gehat.filter(Element => {
               return Element.off_name.includes(this.props.filterValue)
             }) : this.props.gehat
            }
            extraData={ this.props.filterValue.length > 0   ? this.props.gehat.filter(Element => {
                return Element.ff_name.includes(this.props.filterValue)
              }) : this.props.gehat
             }
            refreshing={this.state.refreshing}
            onRefresh={()=>{
              this.props.getGehat()
            }}
            renderItem={({ item, index }) => {
              return (
                <GehaItem onClick={() => {
                  global.setSelectedDrawerIndex(1+index)
                  this.props.EditOrder({ geha_id: item.off_id });
                  this.props.navigation.navigate('offices', { geha: item })
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
    backgroundColor: colors.white,
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
    getGehat: () => { dispatch(getGehat()) },

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
