import React, { Component } from 'react';

import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { colors, fonts, metrics } from '../../themes';
import styles from './styling';
import Icon from 'react-native-vector-icons/Ionicons'; 

export default class MPTextInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
        Color: colors.ofWhite,
        currentValue: '',
        TextColor: colors.TextGrayColor,
        background: colors.BackGrayColor
    }
}
onUnFocus = () => {
    if (this.state.currentValue !== '')
        this.setState({ TextColor: colors.TextGrayColor, Color: colors.ofWhite, background: colors.BackGrayColor })
    else
        this.setState({ TextColor: colors.TextGrayColor, TextColor: colors.error, Color: colors.accentRedExpert, background: '#0000' })

}
OnFocus = () => {
    this.setState({ TextColor: colors.TextgreenColor, Color: colors.accentGreenExpert, background: '#0000' })
}
render() {
    let {keyboardType,value}=this.props
    return (
        <View style={[styles.Container,
        {
            borderColor: this.state.Color,
            backgroundColor: this.state.background,
            height : metrics.screenHeight*.07,
            maxHeight : metrics.screenHeight*.07,
            overflow : 'hidden'
        }]}
        >

            <TextInput
            value={value}
            keyboardType={keyboardType?keyboardType:'default'}
                onChangeText={(text) => {
                    this.setState({ currentValue: text })
                    this.props.onChangeText(text)
              
                }}
                
                secureTextEntry={this.props.secure}
                placeholder={this.props.Title}
                underlineColorAndroid={'#0000'}
                onEndEditing={this.onUnFocus}
                onSubmitEditing={this.onUnFocus}
                onFocus={this.OnFocus}
                style={[styles.Input,{borderColor : this.state.Color }]}
            />
          {this.props.icon&& <View style={{height:'100%',width:1.5,borderRadius:5,backgroundColor : this.state.Color}}/>}
          {this.props.icon&& <Icon name={this.props.icon} size={20} color={this.state.Color} />}
        </View>
    )
}
}

export const DashedTextInput = ({ myonPress, myNumber, myStyle }) => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={myonPress} style={[styles.inputContainer, myStyle]}>
      <View style={styles.numberContainer}>
        <Text style={styles.verifyNum}>{myNumber[0]}</Text>
        <Text style={styles.verifyNum}>{myNumber[1]}</Text>
        <Text style={styles.verifyNum}>{myNumber[2]}</Text>
        <Text style={styles.verifyNum}>{myNumber[3]}</Text>
        <Text style={styles.verifyNum}>{myNumber[4]}</Text>
      </View>

      <View style={styles.dashContainer}>
        <View style={styles.dash} />
        <View style={styles.dash} />
        <View style={styles.dash} />
        <View style={styles.dash} />
        <View style={styles.dash} />
      </View>
    </TouchableOpacity>
  );
};
