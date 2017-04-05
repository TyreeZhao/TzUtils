import {
  LoginExpired,
} from '../constants'
const RESULT_CODE_FIELD = 'resultCode'
// const RESULT_DESCRIPTION_FIELD = 'resultDescription'
const RESULT_DATA_FIELD = 'data'

const RESULT_CODE_OK = 'OK'

export const RESULT_CODE_ACCESSTOKEN_EXPIRED = 'AccessTokenExpired'
export const RESULT_CODE_ACCESSTOKEN_FAILED = 'AuthentificationAccessTokenFailed'
export const RESULT_CODE_NO_CORPORDERINTERIMSTAFF_IN_HISTORY = 'NoCorpOrderInterimStaffInHistory'
export const RESULT_CODE_CLOSET_NOT_FOUND = 'ClosetNotFound'

export const INVALID_GRANT_ERR = 'invalid_grant'

export function parseJson(response) {
  if (response.status >= 400 && response.status !== 401) {
    // try to decode the response
    return response.json().then(data => {
      const e = {
        readable: true,
        error: {
          resultCode: data.resultCode,
          resultDescription: data.resultDescription,
          data: data.data,
        },
      }
      throw e
    }).catch((err) => {
      // if parse json not achievable, contain the exception inside this function
      let error = {
        status: response.status,
        resultCode: response.statusText,
      }

      if (err.hasOwnProperty('readable') && err.readable) {
        error = err.error
      }

      throw error
    })

  }

  return response.json()
}

export function handleJsonResponse(responseJson) {
  if (responseJson[RESULT_CODE_FIELD] === RESULT_CODE_OK) {
    // refresh token failed returns also resultCode = OK, wtf...
    const data = responseJson[RESULT_DATA_FIELD]

    // when return ok, but data is null..
    if (data === null) {
      return data
    }

    if (data.error && data.error === INVALID_GRANT_ERR) {
      throw LoginExpired
    }

    return data
  }

  throw responseJson
}
