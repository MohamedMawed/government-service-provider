import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';

// More info on all the options is below in the API Reference... just some common use cases shown here
const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
import {
  Text, View,
  TouchableOpacity,
  Image
} from 'react-native';
import { colors, metrics, fonts } from './../../themes';
class ImageBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      AvailablePlaces: [],
      place: {
        place_name: "إختار مكان الإستلام"
      },
      SubServicesParams: [],
      avatarSource: "",
      emailError: 'error is here ',
    };
  }
  render() {
    return (
      <View style={{
        width: '100%',
        height: metrics.screenWidth * .2,
        borderRadius: 4,
        backgroundColor: colors.lightGray,
        alignItems: 'center',
        flexDirection: 'row'
      }}>
        <TouchableOpacity
          onPress={() => {
            ImagePicker.showImagePicker(options, (response) => {
              console.log('Response = ', response);

              if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
              } else {
                const source = { uri: response.uri };

                this.setState({
                  avatarSource: source,
                });
              }
            });
          }}
          style={[{
            borderRadius: 4,
            borderColor: 'red',
            borderWidth: 1,
            alignSelf: 'flex-start',
            elevation: 1,
            flexDirection: 'row',
            width: metrics.screenWidth * .2,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }]}>
          <Text style={{ color: colors.darkBlue, fontSize: 40, position: 'absolute' }}>+</Text>
          <Image source={this.state.avatarSource} resizeMode="contain" style={{
            width: metrics.screenWidth * .2, height: '100%',
          }} />
        </TouchableOpacity>
        <Text style={{
          color: colors.darkBlue,
          includeFontPadding: false,
          width: metrics.screenWidth * .7,
          textAlign: 'right',
          padding: 10,
          fontFamily: fonts.type.bold,
          fontSize: fonts.size.h5
        }}>{this.props.name}</Text>


      </View>
    )
  }
}

export default ImageBox;
