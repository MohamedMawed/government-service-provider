import { Height, Width } from '../../../constant/dimention';
import { colors, fonts } from '../../../themes';

export default {
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center'
  },
  descirptionContainer: {
    marginTop: Height * 0.05,
    alignItems: 'center',
    width: '65%'
  },
  descirptionText: {
    textAlign: 'center',
    fontFamily: fonts.type.medium,
    fontSize: fonts.size.regular,
    color: colors.black,
    lineHeight: 30
  },

  phoneNumContainer: {
    marginTop: Height * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: Height * 0.07,
    borderRadius: Width * 0.02,
    backgroundColor: '#f9f9f9'
  },
  phoneNumText: {
    textAlign: 'center',
    fontFamily: fonts.type.medium,
    fontSize: 16,
    color: colors.appThemeOrange
  },
  navigationText: {
    marginTop: Width * 0.07,
    color: '#7A7A7A',
    fontSize: 13,
    fontFamily: fonts.type.normal
  },
  verifyContainer: {
    marginTop: Width * 0.08
  }
};
