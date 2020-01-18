import { Height, Width } from './../../constant/dimention';
import { fonts, colors, metrics } from './../../themes';

export default {
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  logoImage: {
    width: Width * 0.3,
    resizeMode: 'contain',
    height: Height * 0.25,
    tintColor: colors.appThemeOrange
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: colors.appThemeOrange
  },
  registerWord: {
    color: '#7A7A7A',
    fontSize: 13,
    fontFamily: fonts.type.normal
  },
  dontHave: {
    color: '#7A7A7A',
    fontSize: 13,
    fontFamily: fonts.type.normal
  },
  or: {
    marginTop: Height * 0.03,
    fontFamily: fonts.type.normal,
    fontSize: 18,
    color: colors.mediumGray
  },
  navigationContainer: {
    marginTop:metrics.screenHeight*.01,
    flexDirection: 'row'
  },
  margins: {
    height: metrics.screenHeight * 0.04
  },
  underlineText: {
    textDecorationLine: 'underline'
  }
};
