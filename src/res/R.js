import strings from './strings'
import images from './images'
import colors from './colors'
import dimensions from './dimensions'
import numbers from './numbers'
import fontSizes from './fontSizes'
import fonts from './fonts'
import styles from './styles'

const R = {
  strings,
  images,
  colors,
  dimensions,
  numbers,
  fontSizes,
  fonts,
  styles,
}

const getString = (text, ...params) => {
  for (let i = 0; i < params.length; i++) {
    text = text.replace(`%${i + 1}$`, params[i])
  }

  return text
}

const getStringPart = (text, part, ...params) => {
  for (let i = 0; i < params.length; i++) {
    text = text.replace(`%${i + 1}$`, params[i])
  }

  var si = text.indexOf(`<${part}>`)
  var ei = text.indexOf(`</${part}>`)

  if (si == -1 || ei == -1 || si > ei) {
    si = text.indexOf(`<p${part}>`)
    ei = text.indexOf(`</p${part}>`)
  }

  if (si > -1 && ei > -1 && ei > si) return text.substring(text.indexOf('>', si) + 1, ei)
  else return ''
}

export default {
  ...R,
  getString,
  getStringPart,
}
