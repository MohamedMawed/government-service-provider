import React, { Component } from 'react';
import { Image, Text, View, TouchableOpacity, StyleSheet, TextInput, FlatList, SafeAreaView } from 'react-native';
import { metrics, fonts, colors } from './themes';
import { connect } from 'react-redux';
import { CoreUserReducer } from './core/app_state/reducers/users';
import { Requires } from './images/requires';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from './components/button';
import { CustomeAlert } from './components/CustomeAlert';
import { Setting } from '../settings';
import Swiper from "react-native-swiper";

const EditOrder = CoreUserReducer.EditOrder;
const getOffices = CoreUserReducer.getOffices;

const ServiceItem = ({ item, index, onClick }) => {

  return (
    <TouchableOpacity key={index} activeOpacity={.8} onPress={onClick} style={styles.button}>

      <View style={{
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#a98274',
      }}>
        <Text style={{
          textAlign: 'right',
          includeFontPadding: false,
          fontSize: fonts.size.h5,
          fontFamily: fonts.type.normal,
          color: colors.white
        }}>
          {item.count}
        </Text>
      </View>

      <Text style={styles.buttonText}>
        {item.off_name}
      </Text>
      <View style={{
        borderRadius: metrics.borderRadius,
        backgroundColor: colors.white,
      }}>
        <Image style={{

          width: metrics.screenWidth * .15,
          height: metrics.screenWidth * .15,

          resizeMode: 'contain',
        }} source={{ uri: 'http://104.198.161.68' + item.off_icon }} />
      </View>

    </TouchableOpacity>
  )
}


class OfficesTwo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSearch : false,
      searchValue  : "",
      services: [],
      tabSelected: 0,
      showAlert: true,
      currentSelected: 0,
      refreshing: false,
      geha: props.navigation.getParam('geha', 0)
    }
    this.props.getOffices({ geha_id: this.state.geha.off_id })
  }
  componentWillReceiveProps(props) {
    let geha = props.navigation.getParam('geha', 0)
    if (geha.off_id !== this.state.geha.off_id) {
      this.setState({ geha: geha })
      this.props.getOffices({ geha_id: geha.off_id })

    }
  }
  render() {
    return (
      <SafeAreaView style={{
        width: '100%',
        height: '100%',
        backgroundColor: colors.lightGray
      }}>

{this.state.isSearch ? <View style={{
                    flexDirection: 'row',
                    height: metrics.screenHeight * .085,
                    width: metrics.screenWidth,
                    backgroundColor: colors.white,
                    alignItems: 'center',
                    elevation:3,
                    justifyContent: 'space-between',
                    paddingHorizontal: metrics.screenWidth * .04
                }}>

                    <Icon name={'ios-arrow-back'} size={30} color={'#333333'} />
                    <TextInput
                        autoFocus
                        style={{ 
                            height: '100%', 
                            width: metrics.screenWidth * .8, 
                            textAlign: 'right', 
                            fontFamily: fonts.type.normal, 
                            fontSize: fonts.size.h5, 
                            includeFontPadding: false, 
                            color: '#333333' 
                        }}
                        onChangeText={searchValue => this.setState({ searchValue })}
                        value={this.state.searchValue}
                    />
                    <Icon name={'ios-close'} onPress={() => this.setState({ isSearch: false })} size={30} color={'#333333'} />
                </View>
                    :
                    <View style={{
                        flexDirection: 'row',
                        height: metrics.screenHeight * .085,
                        width: metrics.screenWidth,
                        backgroundColor: '#333333',
                        alignItems: 'center',
                        elevation: 3,
                        justifyContent: 'space-between',
                    paddingHorizontal: metrics.screenWidth * .04
                }}>

                    <Icon name={'ios-search'} onPress={() => {
                     
                     this.setState({isSearch : true})
                    }
                    } size={30} color={colors.white} />
                    <Text style={{
                        width: metrics.screenWidth * .8,
                        fontFamily: fonts.type.bold,
                        fontSize: fonts.size.h3,
                        includeFontPadding: false,
                        color: colors.white,
                        textAlign: 'center'
                    }}>{this.state.geha.off_name} </Text>
                    <Icon name={'ios-arrow-forward'} onPress={()=>this.props.navigation.goBack()} size={30} color={colors.white} />
                </View>
                }


        <FlatList
          numColumns={1}
          contentContainerStyle={{ alignItems: 'center' }}
          data={this.state.searchValue.length > 0   ? this.props.offices.filter(Element => {
            return Element.off_name.includes(this.state.searchValue)
          }) : this.props.offices
         }
         extraData={ this.state.searchValue.length > 0   ? this.props.offices.filter(Element => {
             return Element.off_name.includes(this.state.searchValue)
           }) : this.props.offices
          }
          refreshing={this.state.refreshing}
          onRefresh={() => {
            this.props.getOffices({ geha_id: this.state.geha.geha_id })
          }}
          renderItem={({ item, index }) => {
            return (
              <ServiceItem onClick={() => {
                this.props.EditOrder({ office: item.off_id });
                this.props.navigation.navigate({
                  routeName: 'offices',
                  params: { geha: item },
                  key: 'offices' + item.off_name
              })
              }} item={item} index={index} />
            )
          }}
        />


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
    margin: 3,
    flexDirection: 'row',
    borderRadius: metrics.borderRadius,
    backgroundColor: colors.white,
    height: metrics.screenHeight * .1,
    width: metrics.screenWidth * .9,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonText: {
    width: metrics.screenWidth * .6,
    textAlign: 'right',
    includeFontPadding: false,
    fontSize: fonts.size.h5+3,
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
    getOffices: (attribute) => dispatch(getOffices(attribute))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OfficesTwo);
