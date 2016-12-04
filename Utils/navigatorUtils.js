
/**
 * Parse user-agent, result to browser version
 * @param navigator {object} browser's native object
 * @returns {{name: string, version: string}}
 */
export function browserInfo(navigator) {
  const ua = navigator.userAgent
  let tem

  let matched = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
  if (/trident/i.test(matched[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || []
    return {
      name: 'IE',
      version: (tem[1] || ''),
    }
  }
  if (matched[1] === 'Chrome') {
    tem = ua.match(/\b(OPR|Edge)\/(\d+)/)
    if (tem != null) {
      return {
        name: tem[1].replace('OPR', 'Opera'),
        version: tem[2],
      }
    }
  }

  matched = matched[2] ? [matched[1], matched[2]] : [navigator.appName, navigator.appVersion, '-?']
  tem = ua.match(/version\/(\d+)/i)
  if (tem !== null) {
    matched.splice(1, 1, tem[1])
  }

  return {
    name: matched[0],
    version: matched[1],
  }
}


/**
 * Check if current navigator info supported by app defined list
 * @param navList support list {[{name: string, minVersion: number}]}
 * @param currentNavInfo current readable navigator info {{name: string, version: string}}
 * @returns {boolean}
 */
export function supportedByApp(navList, currentNavInfo) {
  for (let nav of navList) {
    if (currentNavInfo.name.toLowerCase() === nav.name.toLowerCase()) {
      const v = parseFloat(currentNavInfo.version)
      if (!!v && v >= nav.minVersion) {
        return true
      }
    }
  }

  return false
}

