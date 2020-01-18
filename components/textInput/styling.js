import { Height, Width } from '../../constant/dimention';
import { colors, fonts, metrics } from '../../themes';

const isDebug = false;

export default {
  textInputContainer: {
    width: '100%',
    height: Height * 0.09,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: isDebug ? 'red' : null
  },
  inputLabel: {
    marginRight: Width * 0.01,
    width: Width * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    textAlign: 'left',
    color: colors.appThemeOrange,
    fontFamily: fonts.type.medium,
    fontSize: fonts.size.medium
  },
  input: {
    flex: 1,
    marginRight: 25,
    height: '100%',
    fontFamily: fonts.type.medium,
    fontSize: fonts.size.medium,
    color: colors.black
  },
  error: {
    width: '100%',
    color: colors.black,
    textAlign: 'center',
    fontFamily: fonts.type.medium,
    fontSize: 13
  },

  inputContainer: {
    height: Height * 0.13,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dashContainer: {
    paddingTop: Height * 0.01,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  numberContainer: {
    paddingTop: Height * 0.1,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  dash: {
    height: Height * 0.001,
    width: '14%',
    backgroundColor: colors.mediumGray
  },
  verifyNum: {
    textAlign: 'center',
    height: '100%',
    width: '20%',
    fontFamily: fonts.type.medium,
    fontSize: fonts.size.h5,
    color: colors.black
  },
  Container: {
    width: '100%',
    borderRadius: 4,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1.5,

  },
  line: {
    height: Height * .045,
    width: 1.5,
  },
  CustomIcon: {
    width: Width * .05,
    height: '100%',
  },
  Input: {
    color: '#000',
    width: '80%',
    textAlign: 'right',
    fontFamily: 'kufi',
    padding : 0,
    fontSize: fonts.size.h5
  }
};
