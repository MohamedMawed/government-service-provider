import { Platform, Dimensions, StatusBar } from 'react-native';
import { colors } from '.';
import fontResponsive from './../constant/utils';

const isIos = Platform.OS === 'ios';
const addMarginText = Platform.OS === 'ios' ? 5 : 0;
const type = {
  normal: 'Amiri-Regular',
  bold: 'Amiri-Bold',
};

const size = {
  h: fontResponsive(48),

  h1: fontResponsive(38),
  h2: fontResponsive(34),
  h3: fontResponsive(30),
  h4: fontResponsive(26),
  h5: fontResponsive(20),
  h6: fontResponsive(19),
  input: fontResponsive(18),
  regular: fontResponsive(19),
  medium: fontResponsive(16),
  small: fontResponsive(14),
  tiny: fontResponsive(8.5),
  xSmall: fontResponsive(13),
  xregular: fontResponsive(21)
};

const styles = {
  textBold: {
    fontFamily: type.bold,
    color: colors.white,
    fontSize: size.regular,
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  marginIos: {
    marginTop: addMarginText,
  },
  textMedium: {
    fontWeight: '500',
    fontFamily: type.medium,
    color: colors.white,
    fontSize: size.h3,
    textAlignVertical: 'center',
    textAlign: 'center'
  },

  textNormal: {
    fontFamily: type.normal,
    color: colors.white,
    fontSize: size.regular,
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  textSlideLightSmall: {
    fontFamily: type.base,
    color: '#fff',
    fontSize: size.medium,
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  textSlideLight: {
    fontFamily: type.base,
    color: colors.white,
    fontSize: size.h5,
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  textSlideBoldSmall: {
    fontFamily: type.bold,
    color: '#fff',
    fontSize: size.medium,
    textAlignVertical: 'center',
    textAlign: 'center'
  },

  textInput: {
    fontFamily: type.bold,
    color: '#fff',
    height: 38,
    fontSize: size.TextInput,
    textAlignVertical: 'center',
    textAlign: 'left'
  },

  underlineText: {
    fontFamily: type.bold,
    color: '#fff',
    fontSize: size.small,
    textAlignVertical: 'center',
    textAlign: 'left',
    textDecorationLine: 'underline'
  },

  descriptionCarousel: {
    fontFamily: type.normal,
    color: colors.black,
    fontSize: Platform.OS === 'ios' ? size.h6 : size.h6,
    textAlignVertical: 'center',
    textAlign: 'left',
    lineHeight: Platform.OS === 'ios' ? size.medium + 2 : size.h6 + 2,
  },
  priceNumber: {
    textAlign: 'center',
    marginTop: isIos ? 4 : 0,
    textAlignVertical: 'center',
    fontSize: size.regular,
    height: size.regular,
    color: colors.white,
    fontFamily: type.bold,
    lineHeight: size.regular,
  }
};

export default {
  type,
  size,
  styles
};
