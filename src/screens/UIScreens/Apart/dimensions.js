import { Dimensions } from 'react-native'

//Default guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375
const guidelineBaseHeight = 812
const { width, height } = Dimensions.get('window')

export const scale = size => (width / guidelineBaseWidth) * size
export const verticalScale = size => (height / guidelineBaseHeight) * size
export const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor
export const moderateVerticalScale = (size, factor = 0.5) => size + (verticalScale(size) - size) * factor

const window = Dimensions.get('window')
const screen = Dimensions.get('screen')

const dimensions = {
  window: window,
  screen: screen,
  /******************* Padding ******************/
  h5: scale(5),
  h10: scale(10),
  h15: scale(15),
  h20: scale(20),
  h25: scale(25),
  h30: scale(30),
  h35: scale(35),
  h40: scale(40),
  h45: scale(45),
  h50: scale(50),
  h55: scale(55),
  h60: scale(60),
  h65: scale(65),
  h70: scale(70),
  h75: scale(75),
  h80: scale(80),
  h85: scale(85),
  h90: scale(90),
  h95: scale(95),
  h10: scale(100),

  v5: verticalScale(5),
  v10: verticalScale(10),
  v15: verticalScale(15),
  v20: verticalScale(20),
  v25: verticalScale(25),
  v30: verticalScale(30),
  v35: verticalScale(35),
  v40: verticalScale(40),
  v45: verticalScale(45),
  v50: verticalScale(50),
  v55: verticalScale(55),
  v60: verticalScale(60),
  v65: verticalScale(65),
  v70: verticalScale(70),
  v75: verticalScale(75),
  v80: verticalScale(80),
  v85: verticalScale(85),
  v90: verticalScale(90),
  v95: verticalScale(95),
  v100: verticalScale(100),
  v105: verticalScale(105),
  v110: verticalScale(110),

  b5: moderateScale(5),
  b10: moderateScale(10),
  b15: moderateScale(15),
  b20: moderateScale(20),
  b25: moderateScale(25),
  b30: moderateScale(30),
  b35: moderateScale(35),
  b40: moderateScale(40),
  b45: moderateScale(45),
  b50: moderateScale(50),
  b55: moderateScale(55),
  b60: moderateScale(60),
  b65: moderateScale(65),
  b65: moderateScale(70),
  b70: moderateScale(70),
  b75: moderateScale(75),
  b80: moderateScale(80),
  b85: moderateScale(85),
  b90: moderateScale(90),
  b95: moderateScale(95),
  b10: moderateScale(100),
}

export default {
  scale,
  verticalScale,
  moderateScale,
  dimensions,
}
