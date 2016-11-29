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

