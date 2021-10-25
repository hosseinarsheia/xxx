import axios from 'axios'
import aeCodes from './apiErrorCodes.js'
import { Alert } from 'react-native'

// export default class api {
//   static instance = null
//   static getInstance() {
//     if (this.instance == null) {
//       this.instance = new api()
//     }

//     return this.instance
//   }

//   constructor() {
//     axios.interceptors.response.use(
//       function (response) {
//         console.log('response : ', response)

//         if (response == null || response.data == null) return Promise.reject(aeCodes.WS_ERROR)
//         let responseJson = response.data

//         if (
//           responseJson.code != 1 ||
//           (responseJson.data != null && responseJson.data.code != null && responseJson.data.code != 1)
//         )
//           return Promise.reject({
//             code: responseJson.code != 1 ? responseJson.code : responseJson.data.code,
//             message: responseJson.code != 1 ? responseJson.message : responseJson.data.message,
//           })
//         else if (responseJson.data != null && responseJson.data.code != null) return responseJson.data.data
//         else if (responseJson.code != null) return responseJson.data
//         else return Promise.reject(aeCodes.WS_ERROR)
//       },
//       function (error) {
//         console.log('error : ', error)

//         if (axios.isCancel(error)) {
//           return Promise.reject(aeCodes.WS_CANCEL)
//         } else return Promise.reject(aeCodes.WS_CONNECT_ERROR)
//       },
//     )
//   }

//   wsCall(url, data = {}) {
//     const CancelToken = axios.CancelToken
//     let cancel

//     var config = {
//       method: 'POST',
//       baseURL: 'https://api.baarbarg.ir/baarbarg_sd/API',
//       url: url,
//       headers: { 'Content-Type': 'application/json' },
//       timeout: 20000,
//       data: {
//         servicePassword: 'md)G20sm98*^(p8dG',
//         reqFrom: 10000 + '1.2.9',
//         ...data,
//       },
//       cancelToken: new CancelToken(function executor(c) {
//         // An executor function receives a cancel function as a parameter
//         cancel = c
//       }),
//     }

//     return {
//       call: () => {
//         // DebugLog(`REQUEST +++++++++ ${url} +++++++++`)
//         // DebugLog(JSON.stringify(config.data))
//         // DebugLog('++++++++++++++++++++++++++')

//         return axios(config)
//       },
//       cancel,
//     }
//     //return axios(config);
//   }
// }

// baseURL: 'https://api.baarbarg.ir/baarbarg_sd/API',
// url: url,
// headers: { 'Content-Type': 'application/json' },
// timeout: 20000,
// data: {
//   servicePassword: 'md)G20sm98*^(p8dG',
//   reqFrom: 10000 + '1.2.9',
//   ...data,
// },
// cancelToken: new CancelToken(function executor(c) {
//   // An executor function receives a cancel function as a parameter
//   cancel = c
// }),

export const api = (url, data, methodType = 'post') => {
  const CancelToken = axios.CancelToken

  const instance = axios.create({
    baseURL: `https://api.baarbarg.ir/baarbarg_sd/API`,

    timeout: 20000,
    headers: { 'Content-Type': 'application/json' },
    cancelToken: new CancelToken(function executor(c) {
      cancel = c
    }),
  })

  instance.interceptors.response.use(
    function (response) {
      if (response == null || response.data == null) return Promise.reject(aeCodes.WS_ERROR)
      let responseJson = response.data

      if (responseJson.code != 1 || (responseJson.data != null && responseJson.data.code != null && responseJson.data.code != 1))
        return Promise.reject({
          code: responseJson.code != 1 ? responseJson.code : responseJson.data.code,
          message: responseJson.code != 1 ? responseJson.message : responseJson.data.message,
        })
      else if (responseJson.data != null && responseJson.data.code != null) return responseJson.data.data
      else if (responseJson.code != null) return responseJson.data
      else return Promise.reject(aeCodes.WS_ERROR)
    },
    function (error) {
      console.log('*********** error : ', error)

      if (axios.isCancel(error)) {
        return Promise.reject(aeCodes.WS_CANCEL)
      } else return Promise.reject(aeCodes.WS_CONNECT_ERROR)
    },
  )

  return instance.request({
    url,
    data: {
      servicePassword: 'md)G20sm98*^(p8dG',
      reqFrom: '10000' + '1.2.9',
      ...data,
    },
    method: methodType,
  })
}

export default api
