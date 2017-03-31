*
 * Truncate a string if too long
 * @param s {string}
 * @param n {number}
 * @returns {string}
 */
function truncString(s, n) {
  return s.substr(0, n - 1) + (s.length > n ? '...' : '')
}

/**
 *convert a string to decimalFormat
 *@param s {string}
 *@returns {string}
 */
function stringWithDecimalFormat(s) {
  let str = s
  if (typeof s !== 'string') {
    str = s.toString()
  }
  let strValue = Math.abs(str)
  if (strValue < 10) {
    return parseInt(str) >= 0 ? `0.0${str}` : `-0.0${strValue}`
  }
  if (strValue < 100) {
    return parseInt(str) >= 0 ? `0.${str}` : `-0.${str}`
  }
  const position = str.length - 2
  return str.substr(0, position) + '.' + str.substr(position)
}


/**
 * when u enter a demcimalCount with string
 * And you want output a price string in Cent, maybe this func is doing well.
 * @param  value {string}
 * @return {string}
 */
function removeFrontZero(v){
  return v.replace(/\b(0+)/gi,"")
}

export function priceStringInCent(price) {
  let priceInCent
  if (price.indexOf('.') !== -1) {
    let value = price.replace(/^0+\./g,'0.')
    let decimalCount = value.length - value.indexOf('.') - 1
    if (decimalCount > 2) {
      priceInCent = parseFloat(value).toFixed(2).split('.').join('')
    }
    else if (decimalCount < 1) {
      priceInCent = value.split('.').join('') + '00'
    }
    else if (decimalCount === 1) {
      priceInCent = value.split('.').join('') + '0'
    }
    else if (decimalCount === 2){
      priceInCent = value.split('.').join('')
    }
    return removeFrontZero(priceInCent)
  } else {
    let value = price.replace(/\b(0+)/gi,"")
    return value + '00'
  }
}

/**
 * regx func, filter regular number at most two decimal
 * @param value {string} the given string
 * @returns {boolean}
 */
export function regularDecimal(value) {
  const regx = /^[0-9]+\.?[0-9]{0,2}?$/
  return regx.test(value)
}

/**
 * give the string of date range thin body
 * if range of date is contained in current year, return MM.DD
 * @param startDate {string} YYYY.MM.DD
 * @param endDate {string} YYYY.MM.DD
 * @returns dateString {string} YYYY.MM.DD ~ YYYY.MM.DD
 */
export function thinDateRangeStr(startDate, endDate) {
  const year = moment().format('YYYY')

  let dateString = ''
  if (year === endDate.substr(0, 4) && year === startDate.substr(0, 4)) {
    startDate = startDate.slice(5, startDate.length)
    endDate = endDate.slice(5, endDate.length)
  }
  dateString = `${startDate} ~ ${endDate}`
  return dateString
}
