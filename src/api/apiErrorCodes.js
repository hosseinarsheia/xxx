import R from '../res/R'

const aeCodes = {
  WS_CANCEL: { code: -1000, message: 'user canceled', isCanceled: true },
  WS_CONNECT_ERROR: { code: 1000, message: R.strings.connectionErrorAndTip },
  WS_ERROR: { code: 1001, message: R.strings.webServiceError },
}

export default aeCodes
