import DeviceInfo from 'react-native-device-info'

export const IOS_DEVICE_TYPES = {
    i386: 'iPhone Simulator 32-bit',
    x86_64: 'iPhone Simulator 64-bit',

    'iPhone1,1': 'iPhone',
    'iPhone1,2': 'iPhone 3G',
    'iPhone2,1': 'iPhone 3GS',
    'iPhone3,1': 'iPhone 4',
    'iPhone3,2': 'iPhone 4 (GSM Rev A)',
    'iPhone3,3': 'iPhone 4 (CDMA)',
    'iPhone4,1': 'iPhone 4S',
    'iPhone5,1': 'iPhone 5 (GSM)',
    'iPhone5,2': 'iPhone 5 (GSM+CDMA)',
    'iPhone5,3': 'iPhone 5C (GSM)',
    'iPhone5,4': 'iPhone 5C (Global)',
    'iPhone6,1': 'iPhone 5S (GSM)',
    'iPhone6,2': 'iPhone 5S (Global)',
    'iPhone7,1': 'iPhone 6 Plus',
    'iPhone7,2': 'iPhone 6',
    'iPhone8,1': 'iPhone 6s',
    'iPhone8,2': 'iPhone 6s Plus',
    'iPhone8,3': 'iPhone SE (GSM+CDMA)',
    'iPhone8,4': 'iPhone SE (GSM)',
    'iPhone9,1': 'iPhone 7 (Global)',
    'iPhone9,2': 'iPhone 7 Plus (Global)',
    'iPhone9,3': 'iPhone 7 (GSM)',
    'iPhone9,4': 'iPhone 7 Plus (GSM)',
    'iPhone10,1': 'iPhone 8',
    'iPhone10,2': 'iPhone 8 Plus',
    'iPhone10,4': 'iPhone 8',
    'iPhone10,5': 'iPhone 8 Plus',
    'iPhone10,3': 'iPhone X',
    'iPhone10,6': 'iPhone X GSM',
    'iPhone11,2': 'iPhone XS',
    'iPhone11,4': 'iPhone XS Max',
    'iPhone11,6': 'iPhone XS Max China',
    'iPhone11,8': 'iPhone XR',

    'iPod1,1': '1st Gen iPod',
    'iPod2,1': '2nd Gen iPod',
    'iPod3,1': '3rd Gen iPod',
    'iPod4,1': '4th Gen iPod',
    'iPod5,1': '5th Gen iPod',
    'iPod7,1': '6th Gen iPod',

    'iPad1,1': 'iPad',
    'iPad1,2': 'iPad 3G',
    'iPad2,1': '2nd Gen iPad (WiFi)',
    'iPad2,2': '2nd Gen iPad (GSM)',
    'iPad2,3': '2nd Gen iPad (CDMA)',
    'iPad2,4': '2nd Gen iPad New Revision',
    'iPad3,1': '3rd Gen iPad (WiFi)',
    'iPad3,2': '3rd Gen iPad (CDMA)',
    'iPad3,3': '3rd Gen iPad (GSM)',
    'iPad2,5': 'iPad mini (WiFi)',
    'iPad2,6': 'iPad mini (GSM+LTE)',
    'iPad2,7': 'iPad mini (CDMA+LTE)',
    'iPad3,4': '4th Gen iPad (WiFi)',
    'iPad3,5': '4th Gen iPad (GSM+LTE)',
    'iPad3,6': '4th Gen iPad (CDMA+LTE)',
    'iPad4,1': 'iPad Air (WiFi)',
    'iPad4,2': 'iPad Air (GSM+CDMA)',
    'iPad4,4': 'iPad mini Retina (WiFi)',
    'iPad4,5': 'iPad mini Retina (GSM+CDMA)',
    'iPad4,6': 'iPad mini Retina (China)',
    'iPad4,7': 'iPad mini 3 (WiFi)',
    'iPad4,8': 'iPad mini 3 (GSM+CDMA)',
    'iPad4,9': 'iPad Mini 3 (China)',
    'iPad5,1': 'iPad mini 4 (WiFi)',
    'iPad5,2': 'iPad mini 4 (GSM+CDMA)',
    'iPad5,3': 'iPad Air 2 (WiFi)',
    'iPad5,4': 'iPad Air 2 (Cellular)',
    'iPad6,3': 'iPad Pro (9.7 inch, WiFi)',
    'iPad6,4': 'iPad Pro (9.7 inch, WiFi+LTE)',
    'iPad6,7': 'iPad Pro (12.9 inch, WiFi)',
    'iPad6,8': 'iPad Pro (12.9 inch, WiFi+LTE)',
    'iPad6,11': '5th Gen iPad (WiFi)',
    'iPad6,12': '5th Gen iPad (GSM+LTE)',
    'iPad7,1': 'iPad Pro 2 (12.9 inch, WiFi)',
    'iPad7,2': 'iPad Pro 2 (12.9 inch, WiFi+LTE)',
    'iPad7,3': 'iPad Pro (10.5 inch, WiFi)',
    'iPad7,4': 'iPad Pro (10.5 inch, WiFi+LTE)',

    'Watch1,1': 'Apple Watch 38mm case',
    'Watch1,2': 'Apple Watch 38mm case',
    'Watch2,6': 'Apple Watch Series 1 38mm case',
    'Watch2,7': 'Apple Watch Series 1 42mm case',
    'Watch2,3': 'Apple Watch Series 2 38mm case',
    'Watch2,4': 'Apple Watch Series 2 42mm case',
}

let _isXSeriesIphone = null
let _isPlusSizeIphone = null
let _isIphoneXS = null
let _isIphoneXR = null
let _isIphoneXSMax = null

export const getIphoneTypeId = () => {

var _getDeviceId =   DeviceInfo.getDeviceId()
    return _getDeviceId 
}

export const getIphoneType = () => {
    return IOS_DEVICE_TYPES[getIphoneTypeId()]
}

export const isXSeriesIphone = () => {

    if (_isXSeriesIphone !== null) {
        return _isXSeriesIphone
    }

    const deviceId = getIphoneTypeId()
    switch (deviceId) {
        case 'iPhone10,3':
        case 'iPhone10,6':
        case 'iPhone11,2':
        case 'iPhone11,4':
        case 'iPhone11,6':
        case 'iPhone11,8': { _isXSeriesIphone = true } break;
        default: _isXSeriesIphone = false
    }
    return _isXSeriesIphone
}

export const isPlusSizeIphone = () => {

    if (_isPlusSizeIphone !== null) {
        return _isPlusSizeIphone
    }

    const deviceId = getIphoneTypeId()
    switch (deviceId) {
        case 'iPhone7,1':
        case 'iPhone8,2':
        case 'iPhone9,2':
        case 'iPhone9,4':
        case 'iPhone10,2':
        case 'iPhone10,5': { _isPlusSizeIphone = true } break;
        default: _isPlusSizeIphone = false
    }

    return _isPlusSizeIphone
}

export const isIphoneXS = () => {

    if (_isIphoneXS !== null) {
        return _isIphoneXS
    }

    const deviceId = getIphoneTypeId()
    _isIphoneXS = deviceId === 'iPhone11,2'
    return _isIphoneXS
}

export const isIphoneXR = () => {

    if (_isIphoneXR !== null) {
        return _isIphoneXR
    }

    const deviceId = getIphoneTypeId()
    _isIphoneXR = deviceId === 'iPhone11,8'
    return _isIphoneXR
}

export const isIphoneXSMax = () => {

    if (_isIphoneXSMax !== null) {
        return _isIphoneXSMax
    }

    const deviceId = getIphoneTypeId()
    _isIphoneXSMax = deviceId === 'iPhone11,4' || deviceId === 'iPhone11,6'
    return _isIphoneXSMax
}
