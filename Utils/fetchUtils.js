
/**
 * This method is aimed to control the AccessTokenExpired error,
 * it will try to refresh token, then
 * - if refresh failed, dispatch a PUSH_LOGIN action
 * - if refresh ok, fetch the original api
 * All results lead to a promise instance for following procedures
 *
 * @param dispatch {function(object)}
 * @param url {string}
 * @param options {object}
 * @returns {Promise}
 */
export default function omniFetch(dispatch, url, options = {}) {
  return fetch(url, options)
    .then(parseJson)
    .then(handleJsonResponse)
    .catch(err => {
      // if is the token expired error
      if (err.resultCode === RESULT_CODE_ACCESSTOKEN_EXPIRED) {
        // return the promise instance
        return fetchRefreshToken()
          .catch((refreshErr) => {
            // but still failed, same as logout
            dispatch(logoutAndRedirect())
            // throw the error for next usage
            throw refreshErr
          })
          // nothing goes wrong, restart the original fetch
          .then(() => {
            // re-inject auth header
            if (options.headers && options.headers.hasOwnProperty('Authorization')) {
              options.headers.Authorization = localStorage.getItem('accesstoken')
            }
            return fetch(url, options)
          })
          .then(parseJson)
          .then(handleJsonResponse)

      } else if (err.resultCode === RESULT_CODE_ACCESSTOKEN_FAILED) {
        // kick directly to login page
        dispatch(logoutAndRedirect())
      }
      // error cannot be handled, should directly throw it
      throw err
    })
}
