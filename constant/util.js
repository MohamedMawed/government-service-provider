
import { Platform, StatusBar, Dimensions } from 'react-native';
import { isIphoneXR } from './deviceTypeHelper';

const { height } = Dimensions.get('window');

export const isIos = () => {
  if (Platform.OS === 'ios') { return true; }
  return false;
};


export default fontResponsive = (size) => {
  const deviceHeight = isIphoneXR()
    ? height - 78
    : Platform.OS === 'android'
      ? height - StatusBar.currentHeight
      : height;

  const heightPercent = (size * deviceHeight) / 730;
  return Math.round(heightPercent);
};
