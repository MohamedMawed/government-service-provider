import { Dimensions, Platform } from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import * as DeviceTypeHelper from '../constant/deviceTypeHelper';

const { width, height } = Dimensions.get('window');
const isXSeriesIphone = DeviceTypeHelper.isXSeriesIphone();
const isIos = Platform.OS === 'ios';

const addHeader = Platform.OS === 'ios' ? (isXSeriesIphone ? 40 : 20) : 0;
const addFooter = Platform.OS === 'ios' ? (isXSeriesIphone ? 44 : 0) : 0;
const mapFooter = Platform.OS === 'ios' ? (isXSeriesIphone ? 44 : 0) : 40;
const marginFooter = Platform.OS === 'ios' ? (isXSeriesIphone ? 10 : 40) : 40;
const addMarginText = Platform.OS === 'ios' ? 3 : 0;

const REAL_WINDOW_HEIGHT = ExtraDimensions.get('REAL_WINDOW_HEIGHT');
const REAL_WINDOW_WIDTH = ExtraDimensions.get('REAL_WINDOW_WIDTH');
const STATUS_BAR_HEIGHT = ExtraDimensions.get('STATUS_BAR_HEIGHT');
const SOFT_MENU_BAR_HEIGHT = ExtraDimensions.get('SOFT_MENU_BAR_HEIGHT');
const SMART_BAR_HEIGHT = ExtraDimensions.get('SMART_BAR_HEIGHT');

const androidMenuesSize = isIos ? 0 : STATUS_BAR_HEIGHT + SOFT_MENU_BAR_HEIGHT;

const metrics = {
  header: 60 + addHeader,
  addHeader,
  addFooter,
  addMarginText,
  marginFooter,
  mapFooter,
  REAL_WINDOW_HEIGHT,
  REAL_WINDOW_WIDTH,
  STATUS_BAR_HEIGHT,
  SOFT_MENU_BAR_HEIGHT,
  SMART_BAR_HEIGHT,
  isXSeriesIphone,
  androidMenuesSize,

  screenWidth:
    width < height ? width : Platform.OS === 'android' ? height : height,
  screenHeight:
    width < height ? (Platform.OS === 'android' ? height : height) : width,

  contentWidth: width * 0.9,
  cardWidth: Platform.OS === 'ios' ? width * 0.85 : width * 0.8,
  iosMargin: Platform.OS === 'ios' ? 5 : 0,
  logoSplash: width * 0.3,
  buttonHeigt: width * 0.15,
  borderRadius: 4,

  fontOpacity: 0.5,
  gradientRtoOButtonStart: { x: 0.56, y: 0.85 },
  gradientRtoOButtonEnd: { x: 0.06, y: 0 },
  gradientRtoOButtonLocation: [0, 1],

  gradientBkackButtonStart: { x: 0.5, y: 0.25 },
  gradientBkackButtonEnd: { x: 0.5, y: 1.0 },
  gradientBkackButtonLocation: [0, 1],

  // expert app
  sizeNotificationFooter: 23.15,
  menuItem: width / 4,
  imageProfile: 75,
  pictureTagHeight: 17,
};

export default metrics;
