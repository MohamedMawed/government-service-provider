import { Height, Width } from '../../constant/dimention';
import { colors, fonts, images, metrics } from '../../themes';

export default {
  buttonWithIconContainer: {
    width: '100%',
    height: Height * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  buttonImageContainer: {
    width: '100%',
    height: Height * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden'
  },

  counterIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    zIndex: 100,
    width: 17,
    height: 17,
    backgroundColor: colors.appThemeOrange,
    borderRadius: 17 / 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  counterText: {
    color: colors.white,
    fontSize: fonts.size.small,
    fontWeight: 'bold',
    height: fonts.size.small
  },
  buttonIcon: {
    marginHorizontal: Width * 0.01,
    width: Width * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: colors.white
  },
  buttonText: {
    includeFontPadding : false,
    fontFamily: fonts.type.normal,
    fontSize: fonts.size.h3,
    textAlign: 'justify',
    color: colors.white
  }
};
