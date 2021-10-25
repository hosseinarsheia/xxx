// import api from './api'
// import axios from 'axios'
// import aeCodes from './apiErrorCodes'

// const ApiCall = api.getInstance()

// export function isCanceled(err) {
//   return err.isCanceled
// }

// export function isWSError(code) {
//   switch (code) {
//     case aeCodes.WS_CONNECT_ERROR.code:
//     case aeCodes.WS_ERROR.code:
//       return true
//     default:
//       return false
//   }
// }

// export function signup(nationalCode, mobile) {
//   return ApiCall.wsCall('/User/Submit', {
//     nationalCode: nationalCode,
//     mobile: mobile,
//   })
// }

// export function signupConfirm(mobile, code) {
//   return ApiCall.wsCall('/User/Confirm', {
//     mobile: mobile,
//     code: code,
//   })
// }

// export function login(mobile, password) {
//   console.log('ApiCall : ', ApiCall)
//   return ApiCall.wsCall('/User/Login', {
//     mobile: mobile,
//     password: password,
//   })
// }
