import { StyleSheet } from 'react-native'
import strings from './strings'
import images from './images'
import colors from './colors'
import numbers from './numbers'
import dimensions from './dimensions'
import fontSizes from './fontSizes'
import fonts from './fonts'

const R = {
  strings,
  images,
  colors,
  dimensions,
  fontSizes,
  fonts,
  numbers,
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: R.colors.white,
    borderRadius: R.dimensions.textBorderRadius,
    paddingVertical: R.dimensions.vNormalPadding,
    paddingHorizontal: R.dimensions.normalPadding,
    borderRadius: R.dimensions.borderRadius,
  },
  myPanel: {
    width: '95%',
    borderTopRightRadius: R.numbers.borderRadius,
    borderTopLeftRadius: R.numbers.borderRadius,
    marginTop: R.dimensions.normalPadding,
    elevation: 3,
    margin: 2,
    backgroundColor: R.colors.white,
    borderRadius: R.dimensions.borderRadius,
  },
  panelContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: R.dimensions.borderRadius,
    padding: R.dimensions.vNormalPadding,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '200%',
    height: '200%',
    // width: R.dimensions.window.height + 100,
    // height: R.dimensions.window.height + 100
  },
  horizontalShadow: {
    elevation: 1.5,
    width: '100%',
    height: 0.2,
    backgroundColor: '#ffffff01',
  },
  toastContainer: {
    backgroundColor: R.colors.xDarkGray,
    height: -1,
    borderRadius: R.fontSizes.normal * 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: R.dimensions.lPadding,
    paddingVertical: R.dimensions.vNormalPadding,
    marginHorizontal: R.dimensions.normalPadding,
  },
  toastText: {
    textAlign: 'center',
    color: R.colors.white,
    fontFamily: R.fonts.IRANSansMobile,
    fontSize: R.fontSizes.normal,
  },
  flexRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: R.dimensions.vNormalPadding,
  },
  headerFont: {
    fontSize: R.fontSizes.xBig,
    fontFamily: R.fonts.IRANSansMobile,
  },
  normalFont: {
    fontSize: R.fontSizes.normal,
    fontFamily: R.fonts.IRANSansMobile,
    color: R.colors.textColor,
  },
  boldFont: {
    fontSize: R.fontSizes.normal,
    fontFamily: R.fonts.IRANSansMobile_Bold,
    color: R.colors.textColor,
  },
  smallFont: {
    fontSize: R.fontSizes.small,
    fontFamily: R.fonts.IRANSansMobile,
    // color: R.colors.textColor
  },
  xSmallFont: {
    fontSize: R.fontSizes.xSmall,
    fontFamily: R.fonts.IRANSansMobile,
    color: R.colors.textColor,
    textAlign: 'center',
  },
  smallFontBold: {
    fontSize: R.fontSizes.xSmall,
    fontFamily: R.fonts.IRANSansMobile_Bold,
    color: R.colors.textColor,
  },

  border: {
    borderWidth: 1,
    borderRadius: R.numbers.borderRadius,
    borderColor: R.colors.text_gray,
  },
  errorText: {
    fontFamily: R.fonts.IRANSansMobile,
    fontSize: R.fontSizes.xxxBig,
    color: R.colors.error,
    textAlign: 'center',
    marginTop: 0,
  },
})

export default styles
