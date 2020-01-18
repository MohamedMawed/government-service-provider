import { Dimensions, StatusBar,Platform } from 'react-native';
import { isIphoneXR } from './deviceTypeHelper';
const { height } = Dimensions.get('window');
export default function fontResponsive(percent) {
  console.log("pure percent",percent);
  const deviceHeight = isIphoneXR()
    ? height - 78 // iPhone X style SafeAreaView size in portrait
    : Platform.OS === 'android'
      ? height - StatusBar.currentHeight
      : height;

  const heightPercent = (percent * deviceHeight) / 730;
  console.log("after percent",Math.round(heightPercent));

  return Math.round(heightPercent);
}
