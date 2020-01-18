import { colors, metrics, images, fonts } from '../../themes';

export default {
 
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoImage: {
    width: metrics.logoSplash,
    height: metrics.logoSplash,
    resizeMode: 'contain',
    tintColor: colors.white,
  },
  activityIndicator: {
    marginTop: metrics.screenHeight*.04
  }
}
