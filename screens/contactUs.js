import React, { Component } from 'react';
import { Image, Text, View, TouchableOpacity, StyleSheet, ScrollView, FlatList, SafeAreaView } from 'react-native';
import { metrics, fonts, colors } from './../themes';
import { connect } from 'react-redux';
class ContactUs extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <SafeAreaView style={{
        width: '100%',
        height: '100%',
        justifyContent:'center',
        alignItems:'center'
      }}>
              <Text style={{ fontSize: fonts.size.h1, includeFontPadding: false, fontFamily: fonts.type.bold, textAlign: 'center', color: colors.red }}>please Contact us through our mail : hello@miltMail.com</Text>
        
        
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
    elevation: 1,
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
