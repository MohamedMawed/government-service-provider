import { Height, Width } from '../../../../constant/dimention';
import { colors, fonts } from '../../../../themes';

export default {
  container: {
    height: Height * 0.9,
    backgroundColor: colors.white,
    alignItems: 'center'
  },
  logoImage: {
    width: Width * 0.2,
    resizeMode: 'contain',
    height: Height * 0.15,
    tintColor: colors.appThemeOrange
  },
  registerWord: {
    color: '#7A7A7A',
    fontSize: 13,

    fontFamily: fonts.type.normal,
    borderBottomWidth: 1,
    borderBottomColor: colors.appThemeOrange
  },
  dontHave: {
    color: '#7A7A7A',
    fontSize: 13,
    fontFamily: fonts.type.normal
  },
  or: {
    fontFamily: fonts.type.normal,
    fontSize: 18,
    color: colors.mediumGray
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: colors.appThemeOrange
  }
};
